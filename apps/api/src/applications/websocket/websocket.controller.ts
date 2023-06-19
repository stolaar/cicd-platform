import { Socket } from "socket.io"
import { ws } from "./decorators/websocket.decorator"
import { inject } from "@loopback/core"
import { LoggingBindings, WinstonLogger } from "@loopback/logging"

@ws("/test")
export class WebSocketController {
  constructor(
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
    @inject("io.socket") // Equivalent to `@inject('ws')`
    private io: Socket,
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: WinstonLogger,
  ) {}

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect() {
    this.logger.info("Client connected: %s", this.socket.id)
  }

  @ws.subscribe("pipelineStatus")
  pipelineStatus() {
    setTimeout(() => {
      this.io.emit("pipelineStatus", { status: "failed" })
      setTimeout(() => {
        this.logger.info("Send success")
        this.io.emit("pipelineStatus", { status: "success" })
      }, 3000)
    }, 3000)
  }

  @ws.subscribe("join-pipeline")
  joinPipeline({ jobId }: { jobId: string }) {
    this.logger.info("Join pipeline server", jobId)
    this.socket.join(`job-${jobId}`)
  }

  /**
   * Register a handler for all events
   * @param msg
   */
  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    this.logger.info("Message", ...args)
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @ws.disconnect()
  disconnect() {
    this.logger.info("Client disconnected: %s", this.socket.id)
  }
}
