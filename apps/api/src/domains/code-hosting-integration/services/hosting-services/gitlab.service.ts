import axios from "axios"
import {
  IDatasource,
  IDatasourceConfig,
  IGitlabProject,
  IGitlabTokenResponse,
  IGitlabUser,
  IProject,
} from "../../types"
import { spawnSync } from "child_process"
import { inject } from "@loopback/core"
import { CODE_HOSTING_CREDENTIALS_SERVICE } from "../../keys"
import { CodeHostingCredentialsService } from "../code-hosting-credentials.service"
import { retryRequest } from "../../../../utils/retry-request.util"
import { GitlabError } from "../../../pipelines/errors/GitlabError"

const gitlabBaseUrl = "https://gitlab.com"

export class GitlabService implements IDatasource {
  private datasourceId?: number
  private accessToken?: string
  private refreshToken?: string

  constructor(
    @inject(CODE_HOSTING_CREDENTIALS_SERVICE)
    private codeHostingCredentialsService: CodeHostingCredentialsService,
  ) {}

  configure(config: IDatasourceConfig) {
    this.datasourceId = config.datasourceId
    this.accessToken = config.accessToken
    this.refreshToken = config.refreshToken
  }

  async setTokens(accessToken: string, refreshToken: string) {
    if (
      this.accessToken &&
      this.accessToken !== accessToken &&
      this.datasourceId
    ) {
      await this.codeHostingCredentialsService.updateTokens(
        this.datasourceId,
        accessToken,
        refreshToken,
      )
    }
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  async retry<T>(cb: () => Promise<T>) {
    return retryRequest(cb, async (err) => {
      if (err?.response?.status === 401) await this.refreshAccessToken()
    })
  }

  async refreshAccessToken() {
    try {
      const {
        data: { access_token, refresh_token },
      } = await axios.post<IGitlabTokenResponse>(
        `${gitlabBaseUrl}/oauth/token`,
        {
          client_id: process.env.GITLAB_CLIENT_ID,
          redirect_uri: process.env.GITLAB_REDIRECT_URI,
          client_secret: process.env.GITLAB_CLIENT_SECRET,
          refresh_token: this.refreshToken,
          grant_type: "refresh_token",
        },
      )

      this.setTokens(access_token, refresh_token)

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
      }
    } catch (err) {
      throw new GitlabError(
        err.response?.data?.error_description,
        err.response?.status,
      )
    }
  }

  async getAccessToken(code: string) {
    const {
      data: { access_token, refresh_token },
    } = await axios.post<IGitlabTokenResponse>(`${gitlabBaseUrl}/oauth/token`, {
      client_id: process.env.GITLAB_CLIENT_ID,
      client_secret: process.env.GITLAB_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.GITLAB_REDIRECT_URI,
    })

    this.setTokens(access_token, refresh_token)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async getProjects(username: string): Promise<IProject[]> {
    return this.retry(async () => {
      try {
        const { data } = await axios.get<IGitlabProject[]>(
          `${gitlabBaseUrl}/api/v4/users/${username}/projects`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        return data.map((project) => ({
          label: project.name,
          value: `${project.id}`,
          provider: "gitlab",
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
      const { data } = await axios.get<IGitlabUser>(
        `${gitlabBaseUrl}/api/v4/user`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      return data
    })
  }

  async registerWebhook(projectId: number) {
    return this.retry(async () => {
      try {
        await axios.post(
          `${gitlabBaseUrl}/api/v4/projects/${projectId}/hooks`,
          {
            id: projectId,
            url: `${process.env.GITLAB_WEBHOOK_BASE_URL}/pipelines/webhook/gitlab`,
            push_events: true,
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

  async cloneRepositories(repositoryId: number, path: string) {
    return this.retry(async () => {
      try {
        const {
          data: { http_url_to_repo },
        } = await axios.get<{
          http_url_to_repo: string
        }>(`${gitlabBaseUrl}/api/v4/projects/${repositoryId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })

        const cloneUrl = http_url_to_repo.replace(
          "https://",
          `https://oauth2:${this.accessToken}@`,
        )
        spawnSync("git", ["clone", cloneUrl, path])
      } catch (err) {
        throw new GitlabError(
          err.response?.data?.error_description,
          err.response.status,
        )
      }
    })
  }

  async getBranches(repositoryId: number, regex: string) {
    return this.retry(async () => {
      try {
        const { data } = await axios.get<any[]>(
          `${gitlabBaseUrl}/api/v4/projects/${repositoryId}/repository/branches?regex=${regex}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        return data.map(({ name, commit }) => ({
          id: commit.id,
          commitMessage: commit.message?.split("\n").shift(),
          author: commit.author_name,
          commitSha: commit.short_id,
          commitLink: commit.web_url,
          branch: name,
        }))
      } catch (err) {
        throw new GitlabError(
          err.response?.data?.error_description,
          err.response.status,
        )
      }
    })
  }
}
