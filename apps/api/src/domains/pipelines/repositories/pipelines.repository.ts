import { Getter, inject } from "@loopback/core"
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { Pipeline, IPipelineRelations } from "../models"
import { Datasource } from "../models/datasource.model"
import { DatasourceRepository } from "./datasource.repository"
import { Job } from "../models/job.model"
import { JobRepository } from "./job.repository"

export class PipelinesRepository extends DefaultCrudRepository<
  Pipeline,
  typeof Pipeline.prototype.id,
  IPipelineRelations
> {
  public readonly datasource: BelongsToAccessor<
    Datasource,
    typeof Datasource.prototype.id
  >

  public readonly jobs: HasManyRepositoryFactory<
    Job,
    typeof Pipeline.prototype.id
  >
  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("DatasourceRepository")
    getUserPreferencesRepository: Getter<DatasourceRepository>,
    @repository.getter("JobRepository")
    getJobRepository: Getter<JobRepository>,
  ) {
    super(Pipeline, dataSource)
    this.datasource = this.createBelongsToAccessorFor(
      "datasource",
      getUserPreferencesRepository,
    )

    this.jobs = this.createHasManyRepositoryFactoryFor("jobs", getJobRepository)
  }
}
