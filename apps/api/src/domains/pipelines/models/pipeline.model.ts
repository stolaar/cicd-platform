import { belongsTo, Entity, model, property } from "@loopback/repository"
import { Datasource } from "./datasource.model"

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
  repository?: string

  @property({
    type: "string",
  })
  branch?: string

  @belongsTo(() => Datasource)
  datasourceId: number

  constructor(data?: Partial<Pipeline>) {
    super(data)
  }
}
