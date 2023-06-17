export interface IAccessTokens {
  accessToken: string
  refreshToken: string
}

export interface IGitlabTokenResponse {
  access_token: string
  refresh_token: string
}

export interface IGitlabProject {
  name: string
  id: number
}

export interface IProject {
  label: string
  value: string
  provider: string
}

export interface IDatasourceUser {
  username?: string
}

export interface IGitlabUser extends IDatasourceUser {}

export interface IDatasource {
  getAccessToken(code: string): Promise<IAccessTokens>
  getProjects(username: string, accessToken: string): Promise<IProject[]>
  getUser(accessToken: string): Promise<IDatasourceUser>
  registerWebhook(projectId: number, accessToken: string): Promise<void>
}
