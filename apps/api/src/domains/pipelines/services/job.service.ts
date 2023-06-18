import { DataObject, repository } from "@loopback/repository"
import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import { Job } from "../models/job.model"
import { JobRepository } from "../repositories/job.repository"
import { RUNNER_SERVICE } from "../keys"
import { RunnerService } from "./runner.service"

export class JobService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(RUNNER_SERVICE)
    private runnerService: RunnerService,
    @repository(JobRepository)
    private jobRepository: JobRepository,
  ) {}
  async createJob(job: DataObject<Job>) {
    return this.jobRepository.create(job)
  }

  async updateJob(id: number, job: DataObject<Job>) {
    return this.jobRepository.updateById(id, job)
  }

  async getJobs(pipelineId: number) {
    return this.jobRepository.find({
      where: {
        pipelineId,
      },
    })
  }

  async deleteJobs(pipelineId: number) {
    return this.jobRepository.deleteAll({
      pipelineId,
    })
  }

  async startJob(job: DataObject<Job>) {
    return this.runnerService.runJob(job)
  }
}
