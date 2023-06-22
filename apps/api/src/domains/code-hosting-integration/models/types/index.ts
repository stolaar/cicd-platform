import { CodeHostingProvider } from "../code-hosting-provider.model"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICodeHostingProviderRelations {
  // describe navigational properties here
}

export type TCodeHostingProviderWithRelations = CodeHostingProvider &
  ICodeHostingProviderRelations
