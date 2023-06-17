import { inject } from "@loopback/core"
import { DefaultCrudRepository } from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { Pipeline, IPipelineRelations } from "../models"

export class PipelinesRepository extends DefaultCrudRepository<
  Pipeline,
  typeof Pipeline.prototype.id,
  IPipelineRelations
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(Pipeline, dataSource)
  }
}
