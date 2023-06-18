import { DataObject } from "@loopback/repository"
import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import { Job } from "../models/job.model"
import { SocketIoBindings, Server } from "@loopback/socketio"

export class RunnerService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject(SocketIoBindings.IO)
    private io: Server,
  ) {
    console.log("Listening on test")
    this.io.on("test", (data) => console.log("Test event", data))
  }
  async runJob(job: DataObject<Job>) {
    if (!job.id) {
      return
    }
    // await this.jobService.updateJob(job.id, {
    //   status: "running",
    // })
    this.io.emit(`job-${job.id}`, { status: "running" })
    setTimeout(() => {
      // this.jobService.updateJob(job.id ?? 0, {
      //   status: "success",
      // })
      this.io.emit(`job-${job.id}`, { status: "success" })
    }, 10000)
  }
}
