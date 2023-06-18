import { FC } from "react"
import { IAppLayout } from "./types"
import { StyledAppContainer, StyledMainContainer } from "./AppLayout.styled"
import { SideBar } from "@components/SideBar"
import { CssBaseline } from "@mui/material"
import { SocketProvider } from "../../providers/SocketProvider/SocketProvider"

export const AppLayout: FC<IAppLayout> = ({ children }) => {
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
