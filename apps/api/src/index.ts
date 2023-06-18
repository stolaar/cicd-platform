import { ApplicationConfig } from "./rest.application"
import { App } from "./app"
import io from "socket.io-client"

export * from "./rest.application"
export * from "./applications/websocket"

export async function main(options: ApplicationConfig = {}) {
  const app = new App(options)
  await app.boot()
  await app.start()

  const socketClient = io(`${app.httpServer.url}/test`)

  socketClient.on("connect", () => console.log("Connected from main"))

  await app.lbApp.bindSocketConnection(app.wsServer.nsp)

  console.log("listening on %s", app.httpServer.url)

  return app
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 8080),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  }
  main(config).catch((err) => {
    console.error("Cannot start the application.", err)
    process.exit(1)
  })
}
