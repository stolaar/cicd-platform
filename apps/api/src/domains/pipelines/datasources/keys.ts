import { BindingKey } from "@loopback/core"
import { GitlabDatasource } from "./gitlab.datasource"

export const GITLAB_DATASOURCE =
  BindingKey.create<GitlabDatasource>("ds.gitlab")
