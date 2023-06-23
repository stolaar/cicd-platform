import { CodeHostingProviderEnum } from "../models"

export interface IAccessTokens {
  accessToken: string
  refreshToken: string
}

export interface IGitlabTokenResponse {
  access_token: string
  refresh_token: string
}

export interface IGithubProject {
  name: string
  id: number
  full_name: string
}

export interface IGitlabProject {
  name: string
  id: number
  path_with_namespace: string
}

export interface IProject {
  label: string
  fullName: string
  value: string
  provider: string
}

export interface ICodeHostingProviderUser {
  username?: string
  avatarUrl?: string
}

export interface IConnectCodeHostingProvider {
  code: string
  provider: CodeHostingProviderEnum
}

export interface IGithubUser {
  login: string
  avatar_url: string
}
export interface IGitlabUser {
  username: string
  avatar_url: string
}

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
  authorAvatarUrl: string
  commitSha: string
  commitLink: string
  branch: string
}

export interface IBranchesConfig {
  regex?: string
  repositoryName?: string
  repositoryId?: number
}

export interface ICloneRepositoriesConfig {
  path: string
  repositoryId?: number
  repositoryName?: string
}

export interface ICodeHostingProvider {
  configure(config: ICodeHostingProviderConfig): void
  getAccessToken(code: string): Promise<IAccessTokens>
  getProjects(username: string): Promise<IProject[]>
  getUser(): Promise<ICodeHostingProviderUser>
  registerWebhook(projectId: number): Promise<void>
  cloneRepositories(config: ICloneRepositoriesConfig): Promise<void>
  getBranches(config: IBranchesConfig): Promise<IBranch[]>
}
