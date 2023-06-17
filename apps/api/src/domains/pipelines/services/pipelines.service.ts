import { DataObject, repository } from "@loopback/repository"
import { PipelinesRepository } from "../repositories/pipelines.repository"
import { Pipeline } from "../models"
import { inject } from "@loopback/core"
import { GITLAB_DATASOURCE } from "../datasources/keys"
import { GitlabDatasource } from "../datasources/gitlab.datasource"
import { DatasourceRepository } from "../repositories/datasource.repository"
import { DatasourceProviderEnum } from "../models/datasource.model"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"

export class PipelinesService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(GITLAB_DATASOURCE)
    public gitlabDatasource: GitlabDatasource,
    @repository(PipelinesRepository)
    private pipelineRepository: PipelinesRepository,
    @repository(DatasourceRepository)
    private datasourceRepository: DatasourceRepository,
  ) {}
  async createPipeline({
    provider,
    ...pipeline
  }: DataObject<Pipeline> & { provider: string }) {
    const datasource = await this.datasourceRepository.findOne({
      where: {
        provider: (provider ?? "") as DatasourceProviderEnum,
      },
    })
    const createdPipeline = await this.pipelineRepository.create({
      ...pipeline,
      ...(!!datasource && { datasourceId: datasource.id }),
    })

    if (
      datasource?.provider === DatasourceProviderEnum.GITLAB &&
      createdPipeline.repositoryId
    ) {
      await this.gitlabDatasource.registerWebhook(
        +createdPipeline.repositoryId,
        datasource.accessToken,
      )
    }
  }

  async getPipelines() {
    return this.pipelineRepository.find()
  }

  async webhook(payload: unknown, provider: string) {
    this.logger.info("Webhook payload:", provider, payload)
  }
}
