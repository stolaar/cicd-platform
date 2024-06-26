import { DataObject, repository } from "@loopback/repository"
import { Job } from "../models/job.model"
import { JobRepository } from "../repositories/job.repository"

export class JobService {
  constructor(
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
}
