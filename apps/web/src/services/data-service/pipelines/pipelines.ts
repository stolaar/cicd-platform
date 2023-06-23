import { createApiHandler } from "../utils"
import axios from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"

export const createPipeline = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/v2/pipelines", payload)
  },
  ["createPipeline"],
)
export const editPipeline = createApiHandler(
  async (payload: unknown) => {
    await axios.put("/api/v2/pipelines", payload)
  },
  ["editPipeline"],
)

export const getPipelines = createApiHandler(
  async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get("/api/v2/pipelines", {
      signal,
    })
    return data
  },
  () => ["pipelines"],
)

export const runPipeline = createApiHandler(
  async (pipelineId: number) => {
    await axios.post(`/api/v2/pipelines/run/${pipelineId}`)
  },
  ["runPipeline"],
)

export const deletePipeline = createApiHandler(
  async (pipelineId: number) => {
    await axios.delete(`/api/v2/pipelines/${pipelineId}`)
  },
  ["deletePipeline"],
)
