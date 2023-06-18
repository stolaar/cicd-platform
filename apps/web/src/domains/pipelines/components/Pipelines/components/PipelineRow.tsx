import { FC } from "react"
import { IPipelineRow } from "./types"
import { GridRow } from "@mui/x-data-grid"
import { PipelineInfoProvider } from "@domain/pipelines/components/Pipelines/providers/PipelineInfoProvider"

export const PipelineRow: FC<IPipelineRow> = ({ children, ...props }) => {
  return (
    <PipelineInfoProvider
      jobId={`${props.row?.lastJob?.id ?? ""}`}
      pipelineCreatedAt={props.row?.created_at}
      pipelineStatus={props.row?.lastJob?.status}
    >
      <GridRow {...props}>{children}</GridRow>
    </PipelineInfoProvider>
  )
}
