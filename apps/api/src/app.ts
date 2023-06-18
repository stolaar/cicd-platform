import { Application, ApplicationConfig } from "@loopback/core"
import { HttpServer } from "@loopback/http-server"
import express from "express"
import * as path from "path"
import { WebSocketController, WebSocketServer } from "./applications/websocket"
import { ApiApplication } from "./applications/api/application"

// tslint:disable:no-any

export class App extends Application {
  readonly httpServer: HttpServer
  readonly wsServer: WebSocketServer
  public readonly lbApp: ApiApplication

  constructor(options: ApplicationConfig = {}) {
    super(options)

    /**
     * Create an Express app to serve the home page
     */
    const expressApp = express()
    const root = path.resolve(__dirname, "../../public")
    this.lbApp = new ApiApplication(options)
    expressApp.use("/", express.static(root))

    // Create an http server backed by the Express app
    this.httpServer = new HttpServer(expressApp, {
      ...options.websocket,
      port: 8080,
    })

    expressApp.use("/api", this.lbApp.requestHandler)

    // Create ws server from the http server
    const wsServer = new WebSocketServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    } as any)
    this.bind("servers.websocket.server1").to(wsServer)
    wsServer.use((socket, next) => {
      console.log("Global middleware - socket:", socket.id)
      next()
    })
    // Add a route
    const ns = wsServer.route(WebSocketController, "test")
    ns.use((socket, next) => {
      console.log(
        "Middleware for namespace %s - socket: %s",
        socket.nsp.name,
        socket.id,
      )
      next()
    })
    this.wsServer = wsServer
  }

  boot() {
    return this.lbApp.boot()
  }

  start() {
    return this.wsServer.start()
  }

  stop() {
    return this.wsServer.stop()
  }
}
