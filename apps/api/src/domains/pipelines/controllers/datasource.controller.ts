import { inject } from "@loopback/core"
import {
  post,
  api,
  Request,
  response,
  RestBindings,
  getJsonSchemaRef,
  requestBody,
  get,
} from "@loopback/rest"
import { DATASOURCE_SERVICE } from "../keys"
import { DatasourceService } from "../services/datasource.service"
import { Datasource } from "../models/datasource.model"
import { IConnectDatasource } from "../services/types"

@api({ basePath: "/datasources" })
export class DatasourceController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(DATASOURCE_SERVICE)
    public datasourceService: DatasourceService,
  ) {}

  @post("/")
  @response(200, {
    responses: {
      "200": {
        description: "Datasource",
        content: {
          schema: getJsonSchemaRef(Datasource),
        },
      },
    },
  })
  createUser(@requestBody() datasource: Datasource): Promise<Datasource> {
    return this.datasourceService.saveDatasource(datasource)
  }

  @get("/")
  @response(200, {
    responses: {
      "200": {
        description: "Datasource",
        content: {
          type: "array",
          schema: getJsonSchemaRef(Datasource),
        },
      },
    },
  })
  getUsers(): Promise<Datasource[]> {
    return this.datasourceService.getDatasource()
  }

  @post("/connect")
  @response(200, {
    responses: {
      "200": {
        description: "Datasource",
      },
    },
  })
  connectDatasource(@requestBody() payload: IConnectDatasource) {
    return this.datasourceService.connectDatasource(payload)
  }

  @get("/repositories")
  @response(200, {
    responses: {
      "200": {
        description: "Datasource repositories",
      },
    },
  })
  getRepositories() {
    return this.datasourceService.getRepositories()
  }
}
