import { FC } from "react"
import { IAppLayout } from "./types"
import { StyledUnAuthAppContainer } from "./AppLayout.styled"
import { CssBaseline } from "@mui/material"
import { useSession } from "next-auth/react"

export const UnAuthAppLayout: FC<IAppLayout> = ({ children }) => {
  const { status } = useSession()
  if (status === "loading") return null

  return (
    <StyledUnAuthAppContainer>
      <CssBaseline />
      {children}
    </StyledUnAuthAppContainer>
  )
}
