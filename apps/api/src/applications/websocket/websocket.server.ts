import { Constructor, Context } from "@loopback/context"
import { HttpServer } from "@loopback/http-server"
import { Server, ServerOptions, Socket } from "socket.io"
import { getWebSocketMetadata } from "./decorators/websocket.decorator"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WebSocketControllerFactory } from "./websocket-controller-factory"
import { Server as SocketIOServer } from "socket.io"

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SockIOMiddleware = (socket: Socket, fn: (err?: any) => void) => void

/**
 * A websocket server
 */
export class WebSocketServer extends Context {
  private io: Server

  constructor(
    public readonly httpServer: HttpServer,
    private options: ServerOptions = {} as ServerOptions,
  ) {
    super()
    this.io = new SocketIOServer(options)
  }

  /**
   * Register a sock.io middleware function
   * @param fn
   */
  use(fn: SockIOMiddleware) {
    return this.io.use(fn)
  }

  /**
   * Register a websocket controller
   * @param ControllerClass
   * @param namespace
   */
  route(ControllerClass: Constructor<any>, namespace?: string | RegExp) {
    if (namespace == null) {
      const meta = getWebSocketMetadata(ControllerClass)
      namespace = meta && meta.namespace
    }

    const nsp = namespace ? this.io.of(namespace) : this.io
    /* eslint-disable @typescript-eslint/no-misused-promises */
    nsp.on("connection", async (socket) => {
      // Create a request context
      const reqCtx = new Context(this)
      // Bind websocket
      reqCtx.bind("ws.socket").to(socket)
      // Instantiate the controller instance
      await new WebSocketControllerFactory(reqCtx, ControllerClass).create(
        socket,
      )
    })
    return nsp
  }

  /**
   * Start the websocket server
   */
  async start() {
    await this.httpServer.start()
    const server = (this.httpServer as HttpServer).server
    this.io.attach(server, this.options)
  }

  /**
   * Stop the websocket server
   */
  async stop() {
    const close = new Promise<void>((resolve) => {
      this.io.close(() => {
        resolve()
      })
    })
    await close
    await this.httpServer.stop()
  }
}
