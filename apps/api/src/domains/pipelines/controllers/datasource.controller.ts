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

@api({ basePath: "/datasources" })
export class PipelinesController {
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
}
