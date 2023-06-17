import { BindingKey } from "@loopback/core"
import { PipelinesService } from "./services/pipelines.service"
import { DatasourceService } from "./services/datasource.service"
import { JobService } from "./services/job.service"

export const PIPELINES_SERVICE =
  BindingKey.create<PipelinesService>("service.pipeline")

export const DATASOURCE_SERVICE =
  BindingKey.create<DatasourceService>("ds.service")

export const JOB_SERVICE = BindingKey.create<JobService>("job.service")
