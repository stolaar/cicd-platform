import { Getter, inject } from "@loopback/core"
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { Pipeline, IPipelineRelations } from "../models"
import { Datasource } from "../models/datasource.model"
import { DatasourceRepository } from "./datasource.repository"

export class PipelinesRepository extends DefaultCrudRepository<
  Pipeline,
  typeof Pipeline.prototype.id,
  IPipelineRelations
> {
  public readonly datasource: BelongsToAccessor<
    Datasource,
    typeof Datasource.prototype.id
  >
  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("DatasourceRepository")
    getUserPreferencesRepository: Getter<DatasourceRepository>,
  ) {
    super(Pipeline, dataSource)
    this.datasource = this.createBelongsToAccessorFor(
      "datasource",
      getUserPreferencesRepository,
    )
  }
}
