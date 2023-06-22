import { createTheme, alpha } from "@mui/material"
import { createStyled } from "@mui/system"
import { components } from "./overrides"
import { palette } from "./palette"
import type { TRem } from "./types"
import { typography } from "./typography"
import { convertPxToRem } from "./util"

export { css, ThemeProvider } from "@mui/material/styles"
export { CssBaseline } from "@mui/material"

declare module "@mui/system/createTheme/createTheme" {
  interface Theme {
    rem: TRem
  }
}

declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    rem: TRem
  }
}

export const theme = createTheme({
  components,
  palette,
  /**
   *
   * @param value {number} value in pixels
   * @returns value in rem as string
   */
  rem: (value: number) => convertPxToRem(typography.htmlFontSize ?? 16, value),

  spacing: (value: string | number): string => {
    if (typeof value === "string") {
      return value
    }
    const factor = 8
    return convertPxToRem(typography.htmlFontSize ?? 16, value * factor)
  },

  typography,
})

export type ThemeType = typeof theme

export const styled = createStyled({ defaultTheme: theme })
export { alpha }
