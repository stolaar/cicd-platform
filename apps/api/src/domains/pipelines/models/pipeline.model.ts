import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from "@loopback/repository"
import { Job } from "./job.model"
import { CodeHostingProvider } from "../../code-hosting-integration/models"

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
  repositoryName?: string

  @property({
    type: "string",
  })
  branch?: string

  @belongsTo(() => CodeHostingProvider)
  codeHostingProviderId: number

  @hasMany(() => Job)
  jobs: Job[]

  constructor(data?: Partial<Pipeline>) {
    super(data)
  }
}
