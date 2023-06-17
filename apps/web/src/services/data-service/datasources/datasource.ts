import { createApiHandler } from "../utils"
import axios from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"

export const connectDatasource = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/datasources/connect", payload)
  },
  ["connect_datasource"],
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
      >("/api/datasources/repositories", {
        signal,
      })
      return data
    },
  () => ["repositories"],
)

export const getDatasources = createApiHandler(
  async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get<{ provider: string; name: string }[]>(
      "/api/datasources",
      { signal },
    )
    return data
  },
  () => ["datasources"],
)
