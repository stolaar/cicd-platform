import { BindingKey } from "@loopback/core"
import { PipelinesService } from "./services/pipelines.service"
import { DatasourceService } from "./services/datasource.service"

export const PIPELINES_SERVICE =
  BindingKey.create<PipelinesService>("service.pipeline")

export const DATASOURCE_SERVICE =
  BindingKey.create<DatasourceService>("ds.service")
