import { Entity, model, property } from "@loopback/repository"

@model()
export class User extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id: number

  @property({
    type: "string",
    required: false,
  })
  name: string

  @property({
    type: "string",
    required: true,
    index: {
      unique: true,
    },
  })
  email: string

  @property({
    type: "string",
    required: true,
    hidden: true,
  })
  password: string

  @property({
    type: "number",
    required: false,
  })
  pin: number

  constructor(data?: Partial<User>) {
    super(data)
  }
}
