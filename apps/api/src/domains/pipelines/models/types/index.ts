import { Pipeline } from "../pipeline.model"
import { Job } from "../job.model"
import { TCodeHostingProviderWithRelations } from "../../../code-hosting-integration/models/types"

export interface IPipelineRelations {
  datasource: TCodeHostingProviderWithRelations
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IJobRelations {
  // describe navigational properties here
}

export type TUserWithRelations = Pipeline & IPipelineRelations
export type TJobWithRelations = Job & IJobRelations
