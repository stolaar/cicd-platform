import { inject } from "@loopback/core"
import { DefaultCrudRepository } from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { IJobRelations } from "../models"
import { Job } from "../models/job.model"

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  IJobRelations
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(Job, dataSource)
  }
}
