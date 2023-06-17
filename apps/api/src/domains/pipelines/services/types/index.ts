import { DatasourceProviderEnum } from "../../models/datasource.model"

export interface IDatasource {
  id?: number
  provider: DatasourceProviderEnum
}

export interface IConnectDatasource extends IDatasource {
  code: string
}

export interface ICreatePipeline {
  name: string
  // Note: this is the ID of the datasource
  datasource: number
  branch?: string
  repositoryId?: number
}
