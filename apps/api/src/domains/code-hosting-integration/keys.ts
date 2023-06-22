import { BindingKey } from "@loopback/core"
import {
  CodeHostingCredentialsService,
  CodeHostingIntegrationService,
} from "./services"
import { IDatasource } from "./types"
import { CodeHostingProviderService } from "./services/code-hosting-provider.service"

export const CODE_HOSTING_INTEGRATION_SERVICE =
  BindingKey.create<CodeHostingIntegrationService>(
    "code-hosting-integration.service",
  )

export const CODE_HOSTING_CREDENTIALS_SERVICE =
  BindingKey.create<CodeHostingCredentialsService>(
    "code-hosting-credentials.service",
  )

export const CODE_HOSTING_PROVIDER = BindingKey.create<IDatasource>(
  "code-hosting.provider",
)

export const CODE_HOSTING_PROVIDER_SERVICE =
  BindingKey.create<CodeHostingProviderService>("code-hosting.provider.service")
