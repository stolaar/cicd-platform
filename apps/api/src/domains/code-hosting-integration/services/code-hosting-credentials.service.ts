import { repository } from "@loopback/repository"
import { CodeHostingProviderRepository } from "../repositories"

export class CodeHostingCredentialsService {
  constructor(
    @repository(CodeHostingProviderRepository)
    private codeHostingProviderRepository: CodeHostingProviderRepository,
  ) {}

  async updateTokens(id: number, accessToken: string, refreshToken: string) {
    await this.codeHostingProviderRepository.updateById(id, {
      accessToken,
      refreshToken,
    })
  }
}
