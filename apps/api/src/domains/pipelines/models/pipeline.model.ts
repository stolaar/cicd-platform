import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from "@loopback/repository"
import { Datasource } from "./datasource.model"
import { Job } from "./job.model"

@model()
export class Pipeline extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: "string",
    required: true,
  })
  name: string

  @property({
    type: "string",
  })
  repositoryId?: string

  @property({
    type: "string",
  })
  branch?: string

  @belongsTo(() => Datasource)
  datasourceId: number

  @hasMany(() => Job)
  jobs: Job[]

  constructor(data?: Partial<Pipeline>) {
    super(data)
  }
}
