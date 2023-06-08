import { Box, styled } from "@mui/material"

export const StyledAppContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  overflowX: "hidden",
})

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}))
