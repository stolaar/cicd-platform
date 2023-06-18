import { DataObject } from "@loopback/repository"
import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"
import { Job } from "../models/job.model"
import { Server } from "@loopback/socketio"

export class RunnerService {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
    @inject("socket.connection")
    private socket: Server,
  ) {}
  async runJob(job: DataObject<Job>) {
    if (!job.id) {
      return
    }
    // TODO: Implement this
  }
}
