import { Entity, hasMany, model, property } from "@loopback/repository"
import { Pipeline } from "../../pipelines/models"

export enum DatasourceProviderEnum {
  GITLAB = "gitlab",
  GITHUB = "github",
}

@model()
export class CodeHostingProvider extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: "string",
  })
  name: string

  @property({
    type: "string",
    properties: ["gitlab", "github"],
  })
  provider: DatasourceProviderEnum

  @property({
    type: "string",
  })
  accessToken: string

  @property({
    type: "string",
  })
  refreshToken: string

  @hasMany(() => Pipeline)
  pipelines: Pipeline[]

  constructor(data?: Partial<CodeHostingProvider>) {
    super(data)
  }
}
