import { BindingKey } from "@loopback/core"
import { PipelinesService } from "./services/pipelines.service"
import { JobService } from "./services/job.service"
import { RunnerService } from "./services/runner.service"

export const PIPELINES_SERVICE =
  BindingKey.create<PipelinesService>("service.pipeline")

export const JOB_SERVICE = BindingKey.create<JobService>("job.service")

export const RUNNER_SERVICE = BindingKey.create<RunnerService>("runner.service")
