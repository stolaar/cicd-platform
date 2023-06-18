import { Alert, styled } from "@mui/material"
import { IPipelineStatus } from "./types"

export const StyledAlert = styled(Alert)<Omit<IPipelineStatus, "id">>(
  ({ theme: { palette }, status }) => {
    let backgroundColor = palette.grey[500]
    if (status === "running") {
      backgroundColor = palette.warning.main
    }
    if (status === "failed") {
      backgroundColor = palette.error.main
    }
    if (status === "success") {
      backgroundColor = palette.success.main
    }
    return {
      backgroundColor,
      color: palette.common.white,
      textTransform: "uppercase",
    }
  },
)
