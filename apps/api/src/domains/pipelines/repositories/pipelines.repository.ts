import { Getter, inject } from "@loopback/core"
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { Pipeline, IPipelineRelations } from "../models"
import { Job } from "../models/job.model"
import { JobRepository } from "./job.repository"
import { CodeHostingProvider } from "../../code-hosting-integration/models"
import { CodeHostingProviderRepository } from "../../code-hosting-integration/repositories"

export class PipelinesRepository extends DefaultCrudRepository<
  Pipeline,
  typeof Pipeline.prototype.id,
  IPipelineRelations
> {
  public readonly codeHostingProvider: BelongsToAccessor<
    CodeHostingProvider,
    typeof CodeHostingProvider.prototype.id
  >

  public readonly jobs: HasManyRepositoryFactory<
    Job,
    typeof Pipeline.prototype.id
  >
  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("DatasourceRepository")
    getCodeHostingProviderRepository: Getter<CodeHostingProviderRepository>,
    @repository.getter("JobRepository")
    getJobRepository: Getter<JobRepository>,
  ) {
    super(Pipeline, dataSource)
    this.codeHostingProvider = this.createBelongsToAccessorFor(
      "codeHostingProvider",
      getCodeHostingProviderRepository,
    )

    this.jobs = this.createHasManyRepositoryFactoryFor("jobs", getJobRepository)
  }
}
