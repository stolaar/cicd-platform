import {
  styled,
  Box,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material"
import { ContainedButton } from "@components"

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
})

export const StyledButtonsContainer = styled(Box)({
  display: "flex",
  gap: "10px",
})

export const StyledGithubButton = styled(ContainedButton)(
  ({ theme: { palette } }) => ({
    background: palette.common.black,
  }),
)

export const StyledDivider = styled(Divider)({
  marginBottom: "15px",
})

export const StyledCard = styled(Card)({
  padding: "5px",
})

export const StyledCardHeader = styled(CardHeader)({
  textTransform: "capitalize",
  padding: "5px",
})

export const StyledCardContent = styled(CardContent)({
  padding: "5px",
})
