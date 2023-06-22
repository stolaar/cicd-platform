import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import { repository } from "@loopback/repository"
import { CODE_HOSTING_INTEGRATION_SERVICE } from "../keys"
import { CodeHostingIntegrationService } from "./code-hosting-integration.service"
import { CodeHostingProviderRepository } from "../repositories"
import { IConnectCodeHostingProvider } from "../types"
import { CodeHostingProviderEnum } from "../models"

export class CodeHostingProviderService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(CODE_HOSTING_INTEGRATION_SERVICE)
    private codeHostingIntegrationService: CodeHostingIntegrationService,
    @repository(CodeHostingProviderRepository)
    private codeHostingProviderRepository: CodeHostingProviderRepository,
  ) {}
  async getHostingProviders() {
    return this.codeHostingProviderRepository.find()
  }

  async connectCodeHostingProvider({
    provider,
    code,
  }: IConnectCodeHostingProvider) {
    const existing = await this.codeHostingProviderRepository.findOne({
      where: { provider },
    })
    let name = ""

    await this.codeHostingIntegrationService.configure({
      name: provider,
    })

    const { accessToken, refreshToken } =
      await this.codeHostingIntegrationService.getAccessToken(code)

    const user = await this.codeHostingIntegrationService.getUser()
    this.logger.info("Code hosting user:", user)
    name = user.username ?? ""
    if (existing) {
      existing.refreshToken = refreshToken
      existing.accessToken = accessToken
      await this.codeHostingProviderRepository.save(existing)
      return
    }
    await this.codeHostingProviderRepository.create({
      name,
      provider,
      accessToken,
      refreshToken,
    })
  }

  async getRepositories() {
    const codeHostingProvider =
      await this.codeHostingProviderRepository.findOne({
        fields: ["id", "accessToken", "name", "refreshToken", "provider"],
        where: { provider: "gitlab" as CodeHostingProviderEnum },
      })

    if (!codeHostingProvider) return []
    await this.codeHostingIntegrationService.configure({
      name: codeHostingProvider.provider,
      accessToken: codeHostingProvider.accessToken,
      refreshToken: codeHostingProvider.refreshToken,
      codeHostingProviderId: codeHostingProvider.id as number,
    })
    return this.codeHostingIntegrationService.getProjects(
      codeHostingProvider.name,
    )
  }
}
