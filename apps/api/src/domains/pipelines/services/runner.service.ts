import { DataObject } from "@loopback/repository"
import { inject } from "@loopback/core"
import { Job } from "../models/job.model"
import { Server } from "@loopback/socketio"
import { JOB_SERVICE } from "../keys"
import { JobService } from "./job.service"
import { spawn } from "child_process"
import { Pipeline } from "../models"
import path from "path"

export class RunnerService {
  constructor(
    @inject(JOB_SERVICE)
    private jobService: JobService,
    @inject("socket.connection")
    private socket: Server,
  ) {}
  async runJob(pipeline: Pipeline, job: DataObject<Job>) {
    if (!job.id) {
      return
    }
    const room = `job-${job.id}`
    await this.jobService.updateJob(job.id, {
      status: "running",
    })
    this.socket
      .to(room)
      .emit("pipelineStatus", { jobId: `${job.id}`, status: "running" })
    const installProcess = spawn("yarn", ["install"], {
      cwd: path.join(
        __dirname,
        "..",
        "..",
        "..",
        "tmp",
        `${pipeline.repositoryId}`,
      ),
    })

    installProcess.stdout.on("data", (data) => {
      this.socket
        .to(room)
        .emit("pipelineLogs", { logs: data?.toString(), jobId: `${job.id}` })
    })

    installProcess.stderr.on("end", async () => {
      await this.jobService.updateJob(job?.id ?? 0, { status: "success" })
      this.socket
        .to(room)
        .emit("pipelineStatus", { status: "success", jobId: `${job.id}` })
    })

    installProcess.stderr.on("error", async () => {
      await this.jobService.updateJob(job?.id ?? 0, { status: "failed" })
      this.socket
        .to(room)
        .emit("pipelineStatus", { status: "failed", jobId: `${job.id}` })
    })
  }
}
