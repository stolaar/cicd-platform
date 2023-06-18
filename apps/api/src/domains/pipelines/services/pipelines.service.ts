import { DataObject, repository } from "@loopback/repository"
import { PipelinesRepository } from "../repositories/pipelines.repository"
import { Pipeline } from "../models"
import { inject } from "@loopback/core"
import { GITLAB_DATASOURCE } from "../datasources/keys"
import { GitlabDatasource } from "../datasources/gitlab.datasource"
import { DatasourceRepository } from "../repositories/datasource.repository"
import { DatasourceProviderEnum } from "../models/datasource.model"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import path from "path"
import { JOB_SERVICE } from "../keys"
import { JobService } from "./job.service"

export class PipelinesService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(GITLAB_DATASOURCE)
    public gitlabDatasource: GitlabDatasource,
    @inject(JOB_SERVICE)
    public jobService: JobService,
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
    const pipelines = await this.pipelineRepository.find()
    return await Promise.all(
      pipelines.map(async (pipeline) => {
        const [lastJob] = await this.pipelineRepository
          .jobs(pipeline.id)
          .find({ limit: 1, order: [`created_at DESC`] })
        return {
          ...pipeline,
          lastJob,
        }
      }),
    )
  }

  async runPipeline(pipelineId: number) {
    const pipeline = await this.pipelineRepository.findById(pipelineId)
    if (!pipeline) {
      throw new Error("Pipeline not found")
    }
    if (pipeline.datasourceId) {
      const datasource = await this.datasourceRepository.findById(
        pipeline.datasourceId,
      )
      if (!datasource) {
        throw new Error("Datasource not found")
      }

      if (
        datasource.provider === DatasourceProviderEnum.GITLAB &&
        pipeline.repositoryId
      ) {
        await this.gitlabDatasource.cloneRepository(
          +pipeline.repositoryId,
          datasource.accessToken,
          path.join(__dirname, "..", "..", "..", "tmp", pipeline.repositoryId),
        )

        const [lastCommit] = await this.gitlabDatasource.getBranch(
          +pipeline.repositoryId,
          datasource.accessToken,
          pipeline.branch,
        )
        if (lastCommit) {
          await this.jobService.createJob({
            commitMessage: lastCommit.commitMessage,
            pipelineId: pipeline.id,
            commitSha: lastCommit.commitSha,
            status: "pending",
            author: lastCommit.author,
            commitLink: lastCommit.commitLink,
            branch: lastCommit.branch,
          })
        }
      }
    }
  }

  async webhook(payload: unknown, provider: string) {
    this.logger.info("Webhook payload:", provider, payload)
  }

  async deletePipeline(pipelineId: number) {
    await this.jobService.deleteJobs(pipelineId)
    await this.pipelineRepository.deleteById(pipelineId)
  }
}
