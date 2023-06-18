import { FC, createContext, useMemo, useEffect } from "react"
import { ISocketContext, ISocketProvider } from "./types"
import { io } from "socket.io-client"

const baseUrl = process.env.BACKEND_URL ?? "http://localhost:8080"
export const SocketContext = createContext<ISocketContext | null>(null)

export const SocketProvider: FC<ISocketProvider> = ({ children }) => {
  const socket = useMemo(() => io(`${baseUrl}/test`), [])

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => console.log("Connected"))
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
