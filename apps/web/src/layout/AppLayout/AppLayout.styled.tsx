import { Box, styled } from "@mui/material"

export const StyledAppContainer = styled(Box)({
  minHeight: "100vh",
  overflowX: "hidden",
})

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  flex: 1,
  display: "flex",
  padding: theme.spacing(3),
  marginLeft: `calc(${theme.spacing(7)} + 5px)`,
}))
