import { Binding, Getter, inject } from "@loopback/core"
import {
  IAccessTokens,
  IBranch,
  ICodeHostingProvider,
  ICodeHostingProviderConfig,
  ICodeHostingProviderUser,
  IProject,
} from "../types"
import { CODE_HOSTING_PROVIDER } from "../keys"
import { GitlabService, GithubService } from "./hosting-services"
import { CodeHostingProviderEnum } from "../models"

export class CodeHostingIntegrationService implements ICodeHostingProvider {
  private service: ICodeHostingProvider

  constructor(
    @inject.getter(CODE_HOSTING_PROVIDER)
    private codeHostingProviderGetter: Getter<ICodeHostingProvider>,
    @inject.binding(CODE_HOSTING_PROVIDER)
    private codeHostingProviderBinding: Binding<ICodeHostingProvider>,
  ) {}

  async configure(config: ICodeHostingProviderConfig) {
    if (config.name) {
      if (config.name === CodeHostingProviderEnum.GITLAB) {
        this.codeHostingProviderBinding.toClass(GitlabService)
      }
      if (config.name === CodeHostingProviderEnum.GITHUB) {
        this.codeHostingProviderBinding.toClass(GithubService)
      }

      this.service = await this.codeHostingProviderGetter()

      this.service.configure(config)
    }
  }

  async getAccessToken(code: string): Promise<IAccessTokens> {
    return this.service.getAccessToken(code)
  }

  async getProjects(username: string): Promise<IProject[]> {
    return this.service.getProjects(username)
  }

  async getUser(): Promise<ICodeHostingProviderUser> {
    return this.service.getUser()
  }

  async registerWebhook(projectId: number): Promise<void> {
    return this.service.registerWebhook(projectId)
  }

  cloneRepositories(repositoryId: number, path: string): Promise<void> {
    return this.service.cloneRepositories(repositoryId, path)
  }

  getBranches(repositoryId: number, regex: string): Promise<IBranch[]> {
    return this.service.getBranches(repositoryId, regex)
  }
}
