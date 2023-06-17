import axios from "axios"
import { GitlabError } from "../errors/GitlabError"
import {
  IDatasource,
  IGitlabProject,
  IGitlabTokenResponse,
  IGitlabUser,
} from "./types"

const gitlabBaseUrl = "https://gitlab.com"

export class GitlabDatasource implements IDatasource {
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

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async getProjects(username: string, accessToken: string) {
    const { data } = await axios.get<IGitlabProject[]>(
      `${gitlabBaseUrl}/api/v4/users/${username}/projects`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return data.map((project) => ({
      label: project.name,
      value: `${project.id}`,
      provider: "gitlab",
    }))
  }

  async getUser(accessToken: string) {
    const { data } = await axios.get<IGitlabUser>(
      `${gitlabBaseUrl}/api/v4/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return data
  }

  async registerWebhook(projectId: number, accessToken: string) {
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
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    } catch (err) {
      throw new GitlabError(
        err.response?.data?.error_description,
        err.response.status,
      )
    }
  }
}
