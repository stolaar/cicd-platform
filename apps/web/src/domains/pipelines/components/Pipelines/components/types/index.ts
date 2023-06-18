import { GridRowProps } from "@mui/x-data-grid"

export interface IPipelineStatus {
  status: "running" | "pending" | "failed" | "success"
  id: string
}

export interface IPipelineRow extends GridRowProps {}
