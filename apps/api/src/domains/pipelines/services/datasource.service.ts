import { DataObject, repository } from "@loopback/repository"
import { Pipeline } from "../models"
import { DatasourceRepository } from "../repositories/datasource.repository"
import { IConnectDatasource } from "./types"
import { inject } from "@loopback/core"
import { GitlabDatasource } from "../datasources/gitlab.datasource"
import { DatasourceProviderEnum } from "../models/datasource.model"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import { GITLAB_DATASOURCE } from "../datasources/keys"

export class DatasourceService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(GITLAB_DATASOURCE)
    private gitlabDatasource: GitlabDatasource,
    @repository(DatasourceRepository)
    private datasourceRepository: DatasourceRepository,
  ) {}
  async saveDatasource(pipeline: DataObject<Pipeline>) {
    return this.datasourceRepository.create(pipeline)
  }

  async getDatasources() {
    return this.datasourceRepository.find()
  }

  async connectDatasource({ provider, code }: IConnectDatasource) {
    try {
      const existing = await this.datasourceRepository.findOne({
        where: { provider },
      })
      let name = ""

      const { accessToken, refreshToken } =
        await this.gitlabDatasource.getAccessToken(code)

      if (provider === DatasourceProviderEnum.GITLAB) {
        const gitlabUser = await this.gitlabDatasource.getUser(accessToken)
        this.logger.info("Gitlab user:", gitlabUser)
        name = gitlabUser.username ?? ""
      }
      if (existing) {
        existing.refreshToken = refreshToken
        existing.accessToken = accessToken
        await this.datasourceRepository.save(existing)
        return
      }
      await this.datasourceRepository.create({
        name,
        provider,
        accessToken,
        refreshToken,
      })
    } catch (err) {
      this.logger.error(err)
      throw err
    }
  }

  async getRepositories() {
    const datasource = await this.datasourceRepository.findOne({
      fields: ["accessToken", "name"],
      where: { provider: "gitlab" as DatasourceProviderEnum },
    })

    if (!datasource) return []

    return this.gitlabDatasource.getProjects(
      datasource.name,
      datasource.accessToken,
    )
  }
}
