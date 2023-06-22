import { FC, createContext, useMemo, useState, useEffect } from "react"
import { IPipelineInfoContext, IPipelineInfoProvider } from "./types"
import { useSocket } from "../../../../../providers/SocketProvider/useSocket"

export const PipelineInfoContext = createContext<IPipelineInfoContext | null>(
  null,
)

export const PipelineInfoProvider: FC<IPipelineInfoProvider> = ({
  jobId,
  pipelineCreatedAt,
  pipelineStatus,
  children,
  pipelineId,
}) => {
  const [status, setStatus] = useState(pipelineStatus ?? "pending")
  const { socket } = useSocket()

  useEffect(() => {
    if (!!jobId && socket) {
      socket.emit("join-pipeline", { jobId })
    }
  }, [jobId, socket])

  const value = useMemo(
    () => ({
      pipelineCreatedAt,
      pipelineStatus: status,
      setStatus,
      jobId,
      pipelineId,
    }),
    [pipelineCreatedAt, status, jobId, pipelineId],
  )

  return (
    <PipelineInfoContext.Provider value={value}>
      {children}
    </PipelineInfoContext.Provider>
  )
}
