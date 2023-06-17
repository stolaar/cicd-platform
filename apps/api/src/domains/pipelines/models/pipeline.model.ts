import { Entity, model, property } from "@loopback/repository"

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

  constructor(data?: Partial<Pipeline>) {
    super(data)
  }
}
