import { createApiHandler } from "../utils"
import axios from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"

export const connectCodeHostingProvider = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/v2/code-hosting-provider/connect", payload)
  },
  ["connectCodeHostingProvider"],
)

export const getRepositories = createApiHandler(
  () =>
    async ({ signal }: QueryFunctionContext) => {
      const { data } = await axios.get<
        {
          label: string
          value: string
          provider: string
          fullName: string
        }[]
      >("/api/v2/code-hosting-provider/repositories", {
        signal,
      })
      return data
    },
  () => ["repositories"],
)

export const getCodeHostingProviders = createApiHandler(
  async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get<
      { provider: string; name: string; avatarUrl: string }[]
    >("/api/v2/code-hosting-provider", { signal })
    return data
  },
  () => ["codeHostingProvider"],
)
