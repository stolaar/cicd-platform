import { inject } from "@loopback/core"
import { DefaultCrudRepository } from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { Pipeline, TDatasourceWithRelations } from "../models"
import { Datasource } from "../models/datasource.model"

export class DatasourceRepository extends DefaultCrudRepository<
  Datasource,
  typeof Pipeline.prototype.id,
  TDatasourceWithRelations
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(Datasource, dataSource)
  }
}
