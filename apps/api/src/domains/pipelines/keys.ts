import { BindingKey } from "@loopback/core"
import { PipelinesService } from "./services/pipelines.service"
import { GitlabDatasource } from "./datasources/gitlab.datasource"
import { DatasourceService } from "./services/datasource.service"

export const PIPELINES_SERVICE =
  BindingKey.create<PipelinesService>("service.pipeline")

export const GITLAB_DATASOURCE =
  BindingKey.create<GitlabDatasource>("datasource.gitlab")

export const DATASOURCE_SERVICE =
  BindingKey.create<DatasourceService>("datasource.service")
