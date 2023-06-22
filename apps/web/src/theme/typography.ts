import type { TypographyOptions } from "@mui/material/styles/createTypography"
import { IPxToRem, ITypography } from "./types"
import { convertPxToRem } from "./util"

declare module "@mui/material/styles" {
  interface TypographyVariants extends ITypography {}
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends ITypography, IPxToRem {}
}

declare module "@mui/material/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    body1: true
    body1m: true
    body2: true
    body2m: true
    button: false
    caption: true
    h1: true
    h2: true
    h3: true
    h4: false
    h5: false
    h6: false
    subtitle1: true
    subtitle2: true
  }
}

const fontSize = 16
const htmlFontSize = 16

export const typography: TypographyOptions = {
  body1: {
    fontSize: convertPxToRem(htmlFontSize, 16),
    fontWeight: 400,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 24),
  },
  body1m: {
    fontSize: convertPxToRem(htmlFontSize, 16),
    fontWeight: 500,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 24),
  },
  body2: {
    fontSize: convertPxToRem(htmlFontSize, 14),
    fontWeight: 400,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 20.02),
  },
  body2m: {
    fontSize: convertPxToRem(htmlFontSize, 14),
    fontWeight: 500,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 20.02),
  },
  caption: {
    fontSize: convertPxToRem(htmlFontSize, 12),
    fontWeight: 400,
    letterSpacing: convertPxToRem(htmlFontSize, 0.4),
    lineHeight: convertPxToRem(htmlFontSize, 19.92),
  },
  fontFamily: "Inter",
  fontSize,
  h1: {
    fontSize: convertPxToRem(htmlFontSize, 32),
    fontWeight: 700,
    letterSpacing: convertPxToRem(htmlFontSize, 0),
    lineHeight: convertPxToRem(htmlFontSize, 39.52),
  },
  h2: {
    fontSize: convertPxToRem(htmlFontSize, 24),
    fontWeight: 700,
    letterSpacing: convertPxToRem(htmlFontSize, 0.05),
    lineHeight: convertPxToRem(htmlFontSize, 32.02),
  },
  h3: {
    fontSize: convertPxToRem(htmlFontSize, 18),
    fontWeight: 700,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 28.8),
  },
  htmlFontSize,
  overline: {
    fontSize: convertPxToRem(htmlFontSize, 12),
    fontWeight: 400,
    letterSpacing: convertPxToRem(htmlFontSize, 1),
    lineHeight: convertPxToRem(htmlFontSize, 19.92),
    textTransform: "uppercase",
  },
  pxToRem: (value: number) => convertPxToRem(htmlFontSize, value),
  subtitle1: {
    fontSize: convertPxToRem(htmlFontSize, 16),
    fontWeight: 600,
    letterSpacing: convertPxToRem(htmlFontSize, 0.15),
    lineHeight: convertPxToRem(htmlFontSize, 28),
  },
  subtitle2: {
    fontSize: convertPxToRem(htmlFontSize, 14),
    fontWeight: 600,
    letterSpacing: convertPxToRem(htmlFontSize, 0.1),
    lineHeight: convertPxToRem(htmlFontSize, 21.98),
  },
}
