import { Binding, Getter, inject } from "@loopback/core"
import {
  IAccessTokens,
  IBranch,
  IDatasource,
  IDatasourceConfig,
  IDatasourceUser,
  IProject,
} from "../types"
import { CODE_HOSTING_PROVIDER } from "../keys"
import { GitlabService, GithubService } from "./hosting-services"

export class CodeHostingIntegrationService implements IDatasource {
  private service: IDatasource

  constructor(
    @inject.getter(CODE_HOSTING_PROVIDER)
    private gitDatasourceGetter: Getter<IDatasource>,
    @inject.binding(CODE_HOSTING_PROVIDER)
    private gitDatasourceBinding: Binding<IDatasource>,
  ) {}

  async configure(config: IDatasourceConfig) {
    console.log("Configure", { config })
    if (config.name) {
      if (config.name === "gitlab") {
        this.gitDatasourceBinding.toClass(GitlabService)
      }
      if (config.name === "github") {
        this.gitDatasourceBinding.toClass(GithubService)
      }

      this.service = await this.gitDatasourceGetter()

      this.service.configure(config)
    }
  }

  async getAccessToken(code: string): Promise<IAccessTokens> {
    return this.service.getAccessToken(code)
  }

  async getProjects(username: string): Promise<IProject[]> {
    return this.service.getProjects(username)
  }

  async getUser(): Promise<IDatasourceUser> {
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
