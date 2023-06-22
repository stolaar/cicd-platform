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
import type { IConnectCodeHostingProvider } from "../types"

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
        description: "Get code hosting providers",
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
  connectCodeHostingProvider(
    @requestBody() payload: IConnectCodeHostingProvider,
  ) {
    return this.codeHostingProviderService.connectCodeHostingProvider(payload)
  }

  @get("/repositories")
  @response(200, {
    responses: {
      "200": {
        description: "Get code hosting repositories",
      },
    },
  })
  getRepositories() {
    return this.codeHostingProviderService.getRepositories()
  }
}
