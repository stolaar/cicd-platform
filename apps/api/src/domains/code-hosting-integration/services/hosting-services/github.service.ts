import axios from "axios"
import {
  IBranchesConfig,
  ICloneRepositoriesConfig,
  ICodeHostingProvider,
  ICodeHostingProviderConfig,
  IGithubProject,
  IGithubUser,
  IGitlabTokenResponse,
  IProject,
} from "../../types"
import { spawnSync } from "child_process"
import { inject } from "@loopback/core"
import { CODE_HOSTING_CREDENTIALS_SERVICE } from "../../keys"
import { CodeHostingCredentialsService } from "../code-hosting-credentials.service"
import { retryRequest } from "../../../../utils/retry-request.util"
import { GitlabError } from "../../../pipelines/errors/GitlabError"

const githubBaseUrl = "https://github.com"
const githubApiBaseUrl = "https://api.github.com"

export class GithubService implements ICodeHostingProvider {
  private codeHostingProviderId?: number
  private accessToken?: string
  private refreshToken?: string

  private requestClient = axios.create({
    headers: {
      Accept: "application/vnd.github+json",
    },
  })

  constructor(
    @inject(CODE_HOSTING_CREDENTIALS_SERVICE)
    private codeHostingCredentialsService: CodeHostingCredentialsService,
  ) {}

  configure(config: ICodeHostingProviderConfig) {
    this.codeHostingProviderId = config.codeHostingProviderId
    this.accessToken = config.accessToken
    this.refreshToken = config.refreshToken
  }

  async setTokens(accessToken: string, refreshToken: string) {
    if (
      this.accessToken &&
      this.accessToken !== accessToken &&
      this.codeHostingProviderId
    ) {
      await this.codeHostingCredentialsService.updateTokens(
        this.codeHostingProviderId,
        accessToken,
        refreshToken,
      )
    }
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  async retry<T>(cb: () => Promise<T>) {
    return retryRequest(
      cb,
      async (err) => {
        if (err?.response?.status === 401) await this.refreshAccessToken()
      },
      1,
    )
  }

  async refreshAccessToken() {
    try {
      const {
        data: { access_token, refresh_token },
      } = await this.requestClient.post<IGitlabTokenResponse>(
        `${githubBaseUrl}/login/oauth/access_token`,
        {
          client_id: process.env.GITLAB_CLIENT_ID,
          client_secret: process.env.GITLAB_CLIENT_SECRET,
          refresh_token: this.refreshToken,
          grant_type: "refresh_token",
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        },
      )

      this.setTokens(access_token, refresh_token)

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
      }
    } catch (err) {
      console.log("Error", err)
      throw new GitlabError(
        err.response?.data?.error_description,
        err.response?.status,
      )
    }
  }

  async getAccessToken(code: string) {
    const {
      data: { access_token, refresh_token },
    } = await this.requestClient.post<IGitlabTokenResponse>(
      `${githubBaseUrl}/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    )

    this.setTokens(access_token, refresh_token)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async getProjects(username: string): Promise<IProject[]> {
    return this.retry(async () => {
      try {
        const { data } = await this.requestClient.get<IGithubProject[]>(
          `${githubApiBaseUrl}/users/${username}/repos`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        return data.map((project) => ({
          label: project.name,
          fullName: project.full_name,
          value: `${project.id}`,
          provider: "github",
        }))
      } catch (err) {
        throw new GitlabError(
          err.response?.data?.error_description,
          err.response.status,
        )
      }
    })
  }

  async getUser() {
    return this.retry(async () => {
      const { data } = await this.requestClient.get<IGithubUser>(
        `${githubApiBaseUrl}/user`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )
      return { avatarUrl: data.avatar_url, username: data.login }
    })
  }

  async registerWebhook(projectId: number) {
    return this.retry(async () => {
      try {
        // TODO: Get username from args
        await this.requestClient.post(
          `${githubApiBaseUrl}/repos/stolaar/${projectId}/hooks`,
          {
            name: "web",
            config: {
              url: `${process.env.GITHUB_WEBHOOK_BASE_URL}/pipelines/webhook/github`,
              content_type: "json",
            },
            events: ["push"],
            active: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
      } catch (err) {
        throw new GitlabError(
          err.response?.data?.error_description,
          err.response.status,
        )
      }
    })
  }

  async cloneRepositories({ path, repositoryName }: ICloneRepositoriesConfig) {
    return this.retry(async () => {
      try {
        const {
          data: { html_url },
        } = await this.requestClient.get<{
          html_url: string
        }>(`${githubApiBaseUrl}/repos/${repositoryName}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })

        const cloneUrl = html_url.replace(
          "https://",
          `https://oauth2:${this.accessToken}@`,
        )
        spawnSync("git", ["clone", cloneUrl, path])
      } catch (err) {
        throw new GitlabError(err.response?.message, err.response.status)
      }
    })
  }

  async getBranches({ repositoryName, regex }: IBranchesConfig) {
    return this.retry(async () => {
      try {
        const { data } = await this.requestClient.get<any[]>(
          `${githubApiBaseUrl}/repos/${repositoryName}/branches`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        return Promise.all(
          data
            .filter(({ name }) =>
              // eslint-disable-next-line security/detect-non-literal-regexp
              regex ? new RegExp(`${regex}` as string).test(name) : true,
            )
            .map(async ({ name, commit: branchCommit }) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const { data: commit } = await this.requestClient.get<any>(
                branchCommit.url,
                {
                  headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                  },
                },
              )
              return {
                id: commit.id,
                commitMessage: commit.commit?.message?.split("\n").shift(),
                author: commit.commit?.author?.name,
                commitSha: commit.sha?.substring(0, 5),
                commitLink: commit.html_url,
                authorAvatarUrl: commit?.author?.avatar_url,
                branch: name,
              }
            }),
        )
      } catch (err) {
        throw new GitlabError(
          err.response?.data?.error_description,
          err.response.status,
        )
      }
    })
  }
}
