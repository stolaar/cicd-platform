import { DataObject, repository } from "@loopback/repository"
import { Pipeline } from "../models"
import { DatasourceRepository } from "../repositories/datasource.repository"

export class DatasourceService {
  constructor(
    @repository(DatasourceRepository)
    private datasourceRepository: DatasourceRepository,
  ) {}
  async saveDatasource(pipeline: DataObject<Pipeline>) {
    return this.datasourceRepository.create(pipeline)
  }

  async getDatasource() {
    return this.datasourceRepository.find()
  }
}
