import { FC, useEffect } from "react"
import { IPipelineStatus } from "./types"
import { StyledAlert } from "./PipelineStatus.styled"
import io from "socket.io-client"
import { ContainedButton } from "@components"

const socket = io("http://localhost:8080/test")

socket.on("connect", () => {
  console.log(`Connected to server `)
})

export const PipelineStatus: FC<IPipelineStatus> = ({ status, id }) => {
  useEffect(() => {
    socket.on(`job-1`, (data) => console.log("Data from server: ", data))
  }, [])

  return (
    <StyledAlert icon={false} status={status}>
      {status}
      <ContainedButton
        onClick={() => {
          socket.emit("test", { id })
        }}
      >
        Test socket
      </ContainedButton>
    </StyledAlert>
  )
}
