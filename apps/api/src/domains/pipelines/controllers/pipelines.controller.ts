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
  param,
} from "@loopback/rest"
import { PipelinesService } from "../services/pipelines.service"
import { Pipeline } from "../models"
import { PIPELINES_SERVICE } from "../keys"

@api({ basePath: "/pipelines" })
export class PipelinesController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(PIPELINES_SERVICE)
    public pipelinesService: PipelinesService,
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
  createPipeline(
    @requestBody() pipeline: Pipeline & { provider: string },
  ): Promise<void> {
    return this.pipelinesService.createPipeline(pipeline)
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
  getUsers() {
    return this.pipelinesService.getPipelines()
  }

  @post("/webhook/{provider}")
  @response(200, {})
  async webhook(
    @requestBody() payload: unknown,
    @param.path.string("provider") provider: string,
  ): Promise<void> {
    await this.pipelinesService.webhook(payload, provider)
  }

  @post("/run/{id}")
  @response(200, {})
  runPipeline(@param.path.number("id") id: number) {
    return this.pipelinesService.runPipeline(id)
  }
}
