import {
  Application as LoopbackApplication,
  ApplicationConfig,
} from "@loopback/core"
import { HttpServer } from "@loopback/http-server"
import express from "express"
import * as path from "path"
import { WebSocketController, WebSocketServer } from "./applications/websocket"
import { ApiApplication } from "./rest.application"
import { LoggingBindings } from "@loopback/logging"
import { ServerOptions } from "socket.io"

export class Application extends LoopbackApplication {
  readonly httpServer: HttpServer
  readonly wsServer: WebSocketServer
  public readonly lbApp: ApiApplication

  constructor(options: ApplicationConfig = {}) {
    super(options)

    const expressApp = express()
    const root = path.resolve(__dirname, "../../public")

    this.httpServer = new HttpServer(expressApp, {
      ...options.websocket,
      port: 8080,
    })

    this.lbApp = new ApiApplication(options)
    expressApp.use("/", express.static(root))

    expressApp.use("/api", this.lbApp.requestHandler)

    // Create ws server from the http server
    const wsServer = new WebSocketServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    } as ServerOptions)
    this.bind("servers.websocket.server1").to(wsServer)
    wsServer.use((socket, next) => {
      this.lbApp.logger.info("Global middleware - socket:", socket.id)
      next()
    })

    const ns = wsServer.route(WebSocketController, "test")
    ns.use((socket, next) => {
      this.lbApp.logger.info(
        "Middleware for namespace %s - socket: %s",
        socket.nsp.name,
        socket.id,
      )
      next()
    })
    this.wsServer = wsServer
  }

  async boot() {
    await this.lbApp.boot()
    this.wsServer.bind(LoggingBindings.WINSTON_LOGGER).to(this.lbApp.logger)
  }

  start() {
    return this.wsServer.start()
  }

  stop() {
    return this.wsServer.stop()
  }
}
