import { alpha } from "@mui/system"
import { IComponents } from "../types"

export const MuiTooltip: IComponents["MuiTooltip"] = {
  styleOverrides: {
    arrow: ({ theme: { palette } }) => ({
      color: palette.background.paper,
    }),
    tooltip: ({ theme: { palette, rem } }) => ({
      backgroundColor: palette.background.paper,
      borderRadius: rem(8),
      boxShadow: `${rem(0)} ${rem(6)} ${rem(24)} ${rem(0)} ${alpha(
        palette.common.black,
        0.16,
      )} `,
      color: palette.text.primary,
      fontSize: rem(10),
      fontWeight: 400,
      letterSpacing: rem(0),
      lineHeight: rem(14),
      margin: 0,
      maxHeight: rem(432),
      maxWidth: rem(380),
      padding: 0,
    }),
  },
}
