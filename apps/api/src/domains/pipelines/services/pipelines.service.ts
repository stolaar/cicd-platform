import { DataObject, repository } from "@loopback/repository"
import { PipelinesRepository } from "../repositories/pipelines.repository"
import { Pipeline } from "../models"
import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import path from "path"
import { JOB_SERVICE, RUNNER_SERVICE } from "../keys"
import { JobService } from "./job.service"
import { Socket } from "socket.io-client"
import { RunnerService } from "./runner.service"
import { CODE_HOSTING_INTEGRATION_SERVICE } from "../../code-hosting-integration/keys"
import { CodeHostingIntegrationService } from "../../code-hosting-integration/services"
import { CodeHostingProviderRepository } from "../../code-hosting-integration/repositories"
import { CodeHostingProviderEnum } from "../../code-hosting-integration/models"

export class PipelinesService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(CODE_HOSTING_INTEGRATION_SERVICE)
    public codeHostingIntegrationService: CodeHostingIntegrationService,
    @inject(JOB_SERVICE)
    public jobService: JobService,
    @inject(RUNNER_SERVICE)
    public runnerService: RunnerService,
    @repository(PipelinesRepository)
    private pipelineRepository: PipelinesRepository,
    @repository(CodeHostingProviderRepository)
    private codeHostingProviderRepository: CodeHostingProviderRepository,
    @inject("socket.connection")
    private socket: Socket,
  ) {}
  async createPipeline({
    provider,
    ...pipeline
  }: DataObject<Pipeline> & { provider: string }) {
    const codeHostingProvider =
      await this.codeHostingProviderRepository.findOne({
        where: {
          provider: (provider ?? "") as CodeHostingProviderEnum,
        },
      })
    const createdPipeline = await this.pipelineRepository.create({
      ...pipeline,
      ...(!!codeHostingProvider && {
        codeHostingProviderId: codeHostingProvider.id,
      }),
    })

    if (
      codeHostingProvider?.provider === CodeHostingProviderEnum.GITLAB &&
      createdPipeline.repositoryId
    ) {
      await this.codeHostingIntegrationService.configure({
        name: codeHostingProvider.provider,
        accessToken: codeHostingProvider.accessToken,
        refreshToken: codeHostingProvider.refreshToken,
        codeHostingProviderId: codeHostingProvider.id,
      })
      await this.codeHostingIntegrationService.registerWebhook(
        +createdPipeline.repositoryId,
      )
    }
  }

  async editPipeline({ id, ...pipeline }: DataObject<Pipeline>) {
    const existingPipeline = await this.pipelineRepository.findById(id)
    if (!existingPipeline) {
      throw new Error("Pipeline not found")
    }
    await this.pipelineRepository.updateById(id, pipeline)
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
    this.socket.emit("pipelineStatus", { status: "running", pipelineId })
    const pipeline = await this.pipelineRepository.findById(pipelineId)
    if (!pipeline) {
      throw new Error("Pipeline not found")
    }
    if (pipeline.codeHostingProviderId) {
      const codeHostingProvider =
        await this.codeHostingProviderRepository.findById(
          pipeline.codeHostingProviderId,
        )
      if (!codeHostingProvider) {
        throw new Error("Code hosting provider not found")
      }

      if (
        codeHostingProvider.provider === CodeHostingProviderEnum.GITLAB &&
        pipeline.repositoryId
      ) {
        await this.codeHostingIntegrationService.configure({
          name: codeHostingProvider.provider,
          accessToken: codeHostingProvider.accessToken,
          refreshToken: codeHostingProvider.refreshToken,
          codeHostingProviderId: codeHostingProvider.id,
        })
        await this.codeHostingIntegrationService.cloneRepositories(
          +pipeline.repositoryId,
          path.join(__dirname, "..", "..", "..", "tmp", pipeline.repositoryId),
        )

        const [lastCommit] =
          await this.codeHostingIntegrationService.getBranches(
            +pipeline.repositoryId,
            {
              regex: pipeline.branch,
              username: codeHostingProvider.name,
            },
          )
        if (lastCommit) {
          const job = await this.jobService.createJob({
            commitMessage: lastCommit.commitMessage,
            pipelineId: pipeline.id,
            commitSha: lastCommit.commitSha,
            status: "running",
            author: lastCommit.author,
            commitLink: lastCommit.commitLink,
            branch: lastCommit.branch,
          })
          this.socket.emit("jobCreated", { jobId: `${job.id}`, pipelineId })
          this.runnerService.runJob(pipeline, job)
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
