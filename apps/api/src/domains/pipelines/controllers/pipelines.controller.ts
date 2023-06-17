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
import { PipelinesService } from "../services/pipelines.service"
import { Pipeline } from "../models"
import { PIPELINES_SERVICE } from "../keys"

@api({ basePath: "/pipelines" })
export class PipelinesController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(PIPELINES_SERVICE)
    public userService: PipelinesService,
  ) {}

  @post("/")
  @response(200, {
    responses: {
      "200": {
        description: "Pipeline",
        content: {
          schema: getJsonSchemaRef(Pipeline),
        },
      },
    },
  })
  createUser(@requestBody() user: Pipeline): Promise<Pipeline> {
    return this.userService.createUser(user)
  }

  @get("/")
  @response(200, {
    responses: {
      "200": {
        description: "Pipeline",
        content: {
          type: "array",
          schema: getJsonSchemaRef(Pipeline),
        },
      },
    },
  })
  getUsers(): Promise<Pipeline[]> {
    return this.userService.getPipelines()
  }
}
