import { createApiHandler } from "../utils"
import axios from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"

export const connectCodeHostingProvider = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/code-hosting-provider/connect", payload)
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
        }[]
      >("/api/code-hosting-provider/repositories", {
        signal,
      })
      return data
    },
  () => ["repositories"],
)

export const getCodeHostingProviders = createApiHandler(
  async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get<{ provider: string; name: string }[]>(
      "/api/code-hosting-provider",
      { signal },
    )
    return data
  },
  () => ["codeHostingProvider"],
)
