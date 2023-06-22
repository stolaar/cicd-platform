import { inject } from "@loopback/core"
import {
  post,
  api,
  response,
  getJsonSchemaRef,
  requestBody,
  get,
} from "@loopback/rest"
import { CODE_HOSTING_PROVIDER_SERVICE } from "../keys"
import { CodeHostingProviderService } from "../services"
import { CodeHostingProvider } from "../models"
import type { IConnectDatasource } from "../types"

@api({ basePath: "/code-hosting-provider" })
export class CodeHostingProviderController {
  constructor(
    @inject(CODE_HOSTING_PROVIDER_SERVICE)
    public codeHostingProviderService: CodeHostingProviderService,
  ) {}

  @get("/")
  @response(200, {
    responses: {
      "200": {
        description: "Datasource",
        content: {
          type: "array",
          schema: getJsonSchemaRef(CodeHostingProvider),
        },
      },
    },
  })
  getCodeHostingProviders(): Promise<CodeHostingProvider[]> {
    return this.codeHostingProviderService.getHostingProviders()
  }

  @post("/connect")
  @response(200, {
    responses: {
      "200": {
        description: "Connect with a code hosting provider",
      },
    },
  })
  connectDatasource(@requestBody() payload: IConnectDatasource) {
    return this.codeHostingProviderService.connectDatasource(payload)
  }

  @get("/repositories")
  @response(200, {
    responses: {
      "200": {
        description: "Code hosting repositories",
      },
    },
  })
  getRepositories() {
    return this.codeHostingProviderService.getRepositories()
  }
}
