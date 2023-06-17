import { Entity, model, property, hasOne } from "@loopback/repository"
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
    required: true,
  })
  name: string

  @property({
    type: "string",
  })
  repository?: string

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
  commit?: string

  @property({
    type: "string",
  })
  author?: string

  @hasOne(() => Pipeline)
  pipeline: Pipeline

  constructor(data?: Partial<Job>) {
    super(data)
  }
}
