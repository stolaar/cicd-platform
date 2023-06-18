import { ReactNode } from "react"
import { Socket } from "socket.io-client"

export interface ISocketProvider {
  children: ReactNode
}

export interface ISocketContext {
  socket: Socket
}
