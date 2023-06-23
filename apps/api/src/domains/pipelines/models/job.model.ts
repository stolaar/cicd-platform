import { Entity, model, property, belongsTo } from "@loopback/repository"
import { Pipeline } from "./pipeline.model"

@model()
export class Job extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: "string",
  })
  branch?: string

  @property({
    type: "string",
  })
  status?: string

  @property({
    type: "string",
  })
  commitMessage?: string

  @property({
    type: "string",
  })
  commitSha?: string

  @property({
    type: "string",
  })
  commitLink?: string

  @property({
    type: "string",
  })
  author?: string

  @property({
    type: "string",
  })
  authorAvatarUrl?: string

  @belongsTo(() => Pipeline)
  pipelineId: number

  @property({
    type: "timestamp",
    default: () => Date.now(),
  })
  created_at: number

  constructor(data?: Partial<Job>) {
    super(data)
  }
}
