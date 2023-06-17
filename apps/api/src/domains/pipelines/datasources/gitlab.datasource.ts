import axios from "axios"
import { GitlabError } from "../errors/GitlabError"

const gitlabBaseUrl = "https://gitlab.com"

export class GitlabDatasource {
  private accessToken: string

  async getAccessToken(code: string) {
    const {
      data: { access_token, refresh_token },
    } = await axios.post<{ access_token: string; refresh_token: string }>(
      `${gitlabBaseUrl}/oauth/token`,
      {
        client_id: process.env.GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GITLAB_REDIRECT_URI,
      },
    )

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async registerWebhook() {
    return axios.post(
      `${gitlabBaseUrl}/api/v4/projects/1/hooks`,
      {
        url: `${process.env.API_BASE_URL}/pipelines`,
        push_events: true,
        token: this.accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    )
  }

  async getProjects(
    username: string,
    accessToken: string,
  ): Promise<{ label: string; value: string; provider: string }[]> {
    const { data } = await axios.get<
      {
        name: string
        id: number
      }[]
    >(`${gitlabBaseUrl}/api/v4/users/${username}/projects`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return data.map((project) => ({
      label: project.name,
      value: `${project.id}`,
      provider: "gitlab",
    }))
  }

  async getUser(accessToken: string) {
    const { data } = await axios.get<{ username?: string }>(
      `${gitlabBaseUrl}/api/v4/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return data
  }

  async createWebhook(projectId: number, accessToken: string) {
    try {
      const { data } = await axios.post(
        `${gitlabBaseUrl}/api/v4/projects/${projectId}/hooks`,
        {
          id: projectId,
          url: `${process.env.GITLAB_WEBHOOK_BASE_URL}/pipelines/webhook/gitlab`,
          push_events: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return data
    } catch (err) {
      throw new GitlabError(
        err.response?.data?.error_description,
        err.response.status,
      )
    }
  }
}
