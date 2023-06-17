import { Pipeline } from "../pipeline.model"
import { Datasource } from "../datasource.model"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPipelineRelations {
  // describe navigational properties here
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatasourceRelations {
  // describe navigational properties here
}

export type TUserWithRelations = Pipeline & IPipelineRelations
export type TDatasourceWithRelations = Datasource & IDatasourceRelations
