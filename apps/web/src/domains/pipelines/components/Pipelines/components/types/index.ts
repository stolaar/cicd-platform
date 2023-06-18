export interface IPipelineStatus {
  status: "running" | "pending" | "failed" | "success"
  id: string
}
