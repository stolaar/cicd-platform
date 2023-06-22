import { inject } from "@loopback/core"
import { DefaultCrudRepository } from "@loopback/repository"
import { DbDataSource } from "../../../datasources"
import { CodeHostingProvider } from "../models"

export class CodeHostingProviderRepository extends DefaultCrudRepository<
  CodeHostingProvider,
  typeof CodeHostingProvider.prototype.id,
  CodeHostingProvider
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(CodeHostingProvider, dataSource)
  }
}
