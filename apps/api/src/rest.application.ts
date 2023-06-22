import { BootMixin } from "@loopback/boot"
import { ApplicationConfig } from "@loopback/core"
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from "@loopback/rest-explorer"
import { RepositoryMixin } from "@loopback/repository"
import { RestApplication } from "@loopback/rest"
import { ServiceMixin } from "@loopback/service-proxy"
import path from "path"
import { MySequence } from "./applications/api/sequence"
import { USERS_SERVICE } from "./domains/users/keys"
import { UserService } from "./domains/users/services/user.service"
import {
  LoggingBindings,
  LoggingComponent,
  WinstonLogger,
  format,
  WinstonTransports,
} from "@loopback/logging"
import {
  JOB_SERVICE,
  PIPELINES_SERVICE,
  RUNNER_SERVICE,
} from "./domains/pipelines/keys"
import { PipelinesService } from "./domains/pipelines/services/pipelines.service"
import { JobService } from "./domains/pipelines/services/job.service"
import { Namespace, Server } from "@loopback/socketio"
import { format as utilFormat } from "util"
import { RunnerService } from "./domains/pipelines/services/runner.service"
import {
  CODE_HOSTING_CREDENTIALS_SERVICE,
  CODE_HOSTING_INTEGRATION_SERVICE,
  CODE_HOSTING_PROVIDER_SERVICE,
} from "./domains/code-hosting-integration/keys"
import {
  CodeHostingCredentialsService,
  CodeHostingIntegrationService,
  CodeHostingProviderService,
} from "./domains/code-hosting-integration/services"

const SPLAT = Symbol.for("splat")

export class ApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  public logger: WinstonLogger

  constructor(options: ApplicationConfig = {}) {
    super(options)
    this.setupBindings()

    this.sequence(MySequence)

    this.static("/", path.join(__dirname, "../public"))

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer",
    })

    this.configure(LoggingBindings.COMPONENT).to({
      enableFluent: false, // default to true
      enableHttpAccessLog: true, // default to true
    })
    this.configure(LoggingBindings.WINSTON_LOGGER).to({
      level: "info",
      colorize: true,
      format: format.combine(
        format.colorize(),
        {
          transform(info) {
            const { [SPLAT]: args = [], message } = info

            info.message = utilFormat(message, ...args)

            return info
          },
        },
        format.simple(),
      ),
      transports: [new WinstonTransports.Console()],
    })
    this.configure(LoggingBindings.FLUENT_SENDER).to({
      host: process.env.FLUENTD_SERVICE_HOST ?? "localhost",
      port: +(process.env.FLUENTD_SERVICE_PORT_TCP ?? 24224),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    })

    this.component(RestExplorerComponent)
    this.component(LoggingComponent)

    this.get<WinstonLogger>(LoggingBindings.WINSTON_LOGGER).then(
      (logger) => (this.logger = logger),
    )

    this.projectRoot = __dirname
    this.bootOptions = {
      controllers: {
        dirs: ["domains/**/**/controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
      repositories: {
        dirs: ["domains/**/repositories"],
        extensions: [".repository.js"],
        nested: true,
      },
    }
  }

  setupBindings(): void {
    this.bind(USERS_SERVICE).toClass(UserService)
    this.bind(CODE_HOSTING_CREDENTIALS_SERVICE).toClass(
      CodeHostingCredentialsService,
    )
    this.bind(CODE_HOSTING_INTEGRATION_SERVICE).toClass(
      CodeHostingIntegrationService,
    )
    this.bind(CODE_HOSTING_PROVIDER_SERVICE).toClass(CodeHostingProviderService)
    this.bind(PIPELINES_SERVICE).toClass(PipelinesService)
    this.bind(JOB_SERVICE).toClass(JobService)
    this.bind(RUNNER_SERVICE).toClass(RunnerService)
  }

  bindSocketConnection(socket: Server | Namespace) {
    this.bind("socket.connection").to(socket)
  }
}
