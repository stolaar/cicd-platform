import { CodeHostingProviderEnum } from "../models"

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

export interface ICodeHostingProviderUser {
  username?: string
}

export interface IConnectCodeHostingProvider {
  code: string
  provider: CodeHostingProviderEnum
}

export interface IGitlabUser extends ICodeHostingProviderUser {}

export interface ICodeHostingProviderConfig {
  name?: string
  codeHostingProviderId?: number
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

export interface ICodeHostingProvider {
  configure(config: ICodeHostingProviderConfig): void
  getAccessToken(code: string): Promise<IAccessTokens>
  getProjects(username: string): Promise<IProject[]>
  getUser(): Promise<ICodeHostingProviderUser>
  registerWebhook(projectId: number): Promise<void>
  cloneRepositories(repositoryId: number, path: string): Promise<void>
  getBranches(repositoryId: number, regex: string): Promise<IBranch[]>
}
