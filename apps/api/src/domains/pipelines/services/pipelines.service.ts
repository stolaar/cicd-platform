import { DataObject, repository } from "@loopback/repository"
import { PipelinesRepository } from "../repositories/pipelines.repository"
import { Pipeline } from "../models"

export class PipelinesService {
  constructor(
    @repository(PipelinesRepository)
    private pipelineRepository: PipelinesRepository,
  ) {}
  async createUser(pipeline: DataObject<Pipeline>) {
    return this.pipelineRepository.create(pipeline)
  }

  async getPipelines() {
    return this.pipelineRepository.find()
  }
}
