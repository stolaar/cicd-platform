import { ReactNode } from "react"

export type TStatus = "running" | "pending" | "failed" | "success"
export interface IPipelineInfoProvider {
  jobId: string
  pipelineStatus: TStatus
  pipelineCreatedAt: string
  children: ReactNode
}

export interface IPipelineInfoContext {
  pipelineStatus: TStatus
  pipelineCreatedAt: string
  setStatus: (status: TStatus) => void
  jobId: string
}
