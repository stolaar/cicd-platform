import { Entity, model, property } from "@loopback/repository"

export enum DatasourceProviderEnum {
  GITLAB = "gitlab",
  GITHUB = "github",
}

@model()
export class Datasource extends Entity {
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
    type: "enum",
    postgresql: {
      columnName: "provider",
      dataType: "ENUM('gitlab', 'github')",
      default: "gitlab",
    },
  })
  provider: DatasourceProviderEnum

  constructor(data?: Partial<Datasource>) {
    super(data)
  }
}
