import { createApiHandler } from "../utils"
import axios from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"

export const createPipeline = createApiHandler(
  async (payload: unknown) => {
    await axios.post("/api/pipelines", payload)
  },
  ["createPipeline"],
)

export const getPipelines = createApiHandler(
  async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get("/api/pipelines", {
      signal,
    })
    return data
  },
  () => ["pipelines"],
)

export const runPipeline = createApiHandler(
  async (pipelineId: number) => {
    await axios.post(`/api/pipelines/run/${pipelineId}`)
  },
  ["runPipeline"],
)

export const deletePipeline = createApiHandler(
  async (pipelineId: number) => {
    await axios.delete(`/api/pipelines/${pipelineId}`)
  },
  ["deletePipeline"],
)
