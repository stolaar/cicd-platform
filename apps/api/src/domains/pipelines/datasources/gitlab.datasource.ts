import axios from "axios"

const gitlabBaseUrl = "https://banzae.gitlab.com"

export class GitlabDatasource {
  private accessToken: string

  async getAccessToken(code: string) {
    const {
      data: { access_token },
    } = await axios.post<{ access_token: string }>(
      `${gitlabBaseUrl}/oauth/token`,
      {
        client_id: process.env.GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GITLAB_REDIRECT_URI,
      },
    )

    this.accessToken = access_token
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

  async getProjects(accountName: string) {
    return axios.get(`${gitlabBaseUrl}/api/v4/users/${accountName}/projects`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
  }
}
