import { Constructor, Context } from "@loopback/context"
import { HttpServer } from "@loopback/http-server"
import { Server, ServerOptions, Socket } from "socket.io"
import { getWebSocketMetadata } from "./decorators/websocket.decorator"
import { WebSocketControllerFactory } from "./websocket-controller-factory"
import { Server as SocketIOServer } from "socket.io"
import { Namespace } from "@loopback/socketio"
import { ExtendedError } from "socket.io/dist/namespace"

export type SockIOMiddleware = (
  socket: Socket,
  fn: (err?: ExtendedError) => void,
) => void

/**
 * A websocket server
 */
export class WebSocketServer extends Context {
  private io: Server
  public nsp: Server | Namespace

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

    this.nsp = namespace ? this.io.of(namespace) : this.io

    this.nsp.on("connection", async (socket) => {
      // Create a request context
      const reqCtx = new Context(this)
      // Bind websocket
      reqCtx.bind("ws.socket").to(socket)
      reqCtx.bind("io.socket").to(this.nsp)
      // Instantiate the controller instance
      await new WebSocketControllerFactory<typeof ControllerClass>(
        reqCtx,
        ControllerClass,
      ).create(socket)
    })
    return this.nsp
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
