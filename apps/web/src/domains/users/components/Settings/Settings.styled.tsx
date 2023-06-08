import { Box, styled } from "@mui/material"

export const StyledSettingsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100%",
}))

export const StyledPanelContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.common.white,
  minWidth: "100%",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
}))
