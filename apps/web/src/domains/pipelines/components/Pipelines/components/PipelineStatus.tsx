import { FC, useEffect } from "react"
import { IPipelineStatus } from "./types"
import { StyledAlert } from "./PipelineStatus.styled"
import { usePipelineInfo } from "@domain/pipelines/components/Pipelines/providers/usePipelineInfo"
import { useSocket } from "../../../../../providers/SocketProvider/useSocket"
import { TStatus } from "@domain/pipelines/components/Pipelines/providers/types"

export const PipelineStatus: FC<IPipelineStatus> = () => {
  const {
    pipelineStatus,
    setStatus,
    jobId: currentJobId,
    pipelineId,
  } = usePipelineInfo()
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on(
        "pipelineStatus",
        ({
          status,
          jobId,
          pipelineId: receivedPipelineId,
        }: {
          status: TStatus
          jobId: string
          pipelineId: number
        }) => {
          if (jobId === currentJobId || receivedPipelineId === pipelineId)
            setStatus(status)
        },
      )

      socket.on(
        "pipelineLogs",
        ({ logs, jobId }: { logs: string; jobId: string }) => {
          if (jobId === currentJobId) {
            console.log("pipelineLogs", logs)
          }
        },
      )
    }
  }, [socket, setStatus, currentJobId])

  return (
    <StyledAlert icon={false} status={pipelineStatus}>
      {pipelineStatus}
    </StyledAlert>
  )
}
