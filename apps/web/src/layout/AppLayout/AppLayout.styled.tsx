import { Box, styled } from "@mui/material"

export const StyledAppContainer = styled(Box)({
  minHeight: "100vh",
  overflowX: "hidden",
})

export const StyledUnAuthAppContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowX: "hidden",
  textAlign: "center",
})

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  flex: 1,
  display: "flex",
  padding: theme.spacing(3),
  marginLeft: `calc(${theme.spacing(7)} + 5px)`,
}))
