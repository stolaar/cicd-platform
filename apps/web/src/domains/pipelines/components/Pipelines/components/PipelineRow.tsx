import { FC, useEffect, useState } from "react"
import { IPipelineRow } from "./types"
import { GridRow } from "@mui/x-data-grid"
import { PipelineInfoProvider } from "@domain/pipelines/components/Pipelines/providers/PipelineInfoProvider"
import { useSocket } from "../../../../../providers/SocketProvider/useSocket"

export const PipelineRow: FC<IPipelineRow> = ({ children, ...props }) => {
  const [jobId, setJobId] = useState<string>(`${props.row?.lastJob?.id ?? ""}`)
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on(
        "jobCreated",
        ({ jobId, pipelineId }: { jobId: string; pipelineId: number }) => {
          if (pipelineId === props.row?.id) {
            setJobId(jobId)
          }
        },
      )
    }
  }, [socket])

  return (
    <PipelineInfoProvider
      jobId={jobId}
      pipelineId={props.row?.id}
      pipelineCreatedAt={props.row?.created_at}
      pipelineStatus={props.row?.lastJob?.status}
    >
      <GridRow {...props}>{children}</GridRow>
    </PipelineInfoProvider>
  )
}
