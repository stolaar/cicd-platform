import { FC } from "react"
import { IAppLayout } from "./types"
import { StyledAppContainer, StyledMainContainer } from "./AppLayout.styled"
import { SideBar } from "@components/SideBar"
import { CssBaseline } from "@mui/material"
import { SocketProvider } from "../../providers/SocketProvider/SocketProvider"
import { useSession } from "next-auth/react"

export const AppLayout: FC<IAppLayout> = ({ children }) => {
  const { status } = useSession()
  if (status === "loading") return null

  return (
    <StyledAppContainer>
      <SocketProvider>
        <CssBaseline />
        <SideBar />
        <StyledMainContainer component={"main"}>{children}</StyledMainContainer>
      </SocketProvider>
    </StyledAppContainer>
  )
}
