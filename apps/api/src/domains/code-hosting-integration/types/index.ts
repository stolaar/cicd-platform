import { DatasourceProviderEnum } from "../models"

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

export interface IConnectDatasource {
  code: string
  provider: DatasourceProviderEnum
}

export interface IGitlabUser extends IDatasourceUser {}

export interface IDatasourceConfig {
  name?: string
  datasourceId?: number
  accessToken?: string
  refreshToken?: string
}

export interface IBranch {
  id: number
  commitMessage: string
  author: string
  commitSha: string
  commitLink: string
  branch: string
}

export interface IDatasource {
  configure(config: IDatasourceConfig): void
  getAccessToken(code: string): Promise<IAccessTokens>
  getProjects(username: string): Promise<IProject[]>
  getUser(): Promise<IDatasourceUser>
  registerWebhook(projectId: number): Promise<void>
  cloneRepositories(repositoryId: number, path: string): Promise<void>
  getBranches(repositoryId: number, regex: string): Promise<IBranch[]>
}
