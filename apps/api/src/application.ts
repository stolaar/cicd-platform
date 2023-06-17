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
import { MySequence } from "./sequence"
import { USERS_SERVICE } from "./domains/users/keys"
import { UserService } from "./domains/users/services/user.service"
import { format, LoggingBindings, LoggingComponent } from "@loopback/logging"
import {
  DATASOURCE_SERVICE,
  JOB_SERVICE,
  PIPELINES_SERVICE,
} from "./domains/pipelines/keys"
import { DatasourceService } from "./domains/pipelines/services/datasource.service"
import { GITLAB_DATASOURCE } from "./domains/pipelines/datasources/keys"
import { GitlabDatasource } from "./domains/pipelines/datasources/gitlab.datasource"
import { PipelinesService } from "./domains/pipelines/services/pipelines.service"
import { JobService } from "./domains/pipelines/services/job.service"

export { ApplicationConfig }

export class ApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
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
    })
    this.configure(LoggingBindings.FLUENT_SENDER).to({
      host: process.env.FLUENTD_SERVICE_HOST ?? "localhost",
      port: +(process.env.FLUENTD_SERVICE_PORT_TCP ?? 24224),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    })

    this.component(RestExplorerComponent)
    this.component(LoggingComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
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
    this.bind(DATASOURCE_SERVICE).toClass(DatasourceService)
    this.bind(GITLAB_DATASOURCE).toClass(GitlabDatasource)
    this.bind(PIPELINES_SERVICE).toClass(PipelinesService)
    this.bind(JOB_SERVICE).toClass(JobService)
  }
}
