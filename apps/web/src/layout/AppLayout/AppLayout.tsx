import { FC } from "react"
import { IAppLayout } from "./types"
import { StyledAppContainer, StyledMainContainer } from "./AppLayout.styled"
import { SideBar } from "@components/SideBar"
import { CssBaseline } from "@mui/material"

export const AppLayout: FC<IAppLayout> = ({ children }) => {
  return (
    <StyledAppContainer>
      <CssBaseline />
      <SideBar />
      <StyledMainContainer component={"main"}>{children}</StyledMainContainer>
    </StyledAppContainer>
  )
}
