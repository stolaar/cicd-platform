import type { CSSProperties } from "react"
import type { CSSInterpolation, CSSObject, Components } from "@mui/material"
import type { ThemeType } from "../theme"
import type {
  DataGridProps as MUIDataGridProps,
  GridClassKey as MUIDataGridClassKey,
} from "@mui/x-data-grid"
import type { OverridesStyleRules } from "@mui/material/styles/overrides"

export type TRem = (value: number) => string

export interface IOther {
  backdropOverlay: string
  divider: string
  filledInputBackground: string
  outlineBorder: string
  questionnaireModalBackdrop: string
  ratingActive: string
  scrollbarTrack: string
  scrollbarTrackShadow: string
  snackbar: string
  standardInputLine: string
}
export interface IBackground {
  active: string
  blurredBackground: string
  darkBackground: string
  divider: string
  lightBackground: string
  outlineBorder: string
}
export interface IThemeText {
  disabled: string
  primary: string
  secondary: string
  secondaryWhite: string
  white: string
}

export interface IPaletteColorVariants {
  "12p": CSSProperties["color"]
  "160p": CSSProperties["color"]
  "190p": CSSProperties["color"]
  "30p": CSSProperties["color"]
  "30pRipple": CSSProperties["color"]
  "4p": CSSProperties["color"]
  "50p": CSSProperties["color"]
  "8p": CSSProperties["color"]
}

export interface IPaletteVariants {
  other: IOther
}

export interface IPxToRem {
  pxToRem(value: number): string
  pxToRem(topBottom: number, rightLeft: number): string
  pxToRem(top: number, rightLeft: number, bottom: number): string
  pxToRem(top: number, right: number, bottom: number, left: number): string
}

export interface ITypography {
  body1: CSSProperties
  body1m: CSSProperties
  body2: CSSProperties
  body2m: CSSProperties
  caption: CSSProperties
  h1: CSSProperties
  h2: CSSProperties
  h3: CSSProperties
  subtitle1: CSSProperties
  subtitle2: CSSProperties
}

type CustomOverride<
  ClassKey extends string,
  Name extends string,
  Theme = unknown,
> = Partial<OverridesStyleRules<ClassKey, Name, Theme>> & {
  MuiCssBaseline?: CSSObject | string | ((theme: ThemeType) => CSSInterpolation)
}
export interface IComponents extends Components<ThemeType> {
  // TODO: use  import "@mui/x-data-grid/themeAugmentation" when https://github.com/mui/mui-x/pull/6269 is moved to opensource
  MuiDataGrid?: {
    defaultProps?: MUIDataGridProps
    styleOverrides?: CustomOverride<
      MUIDataGridClassKey,
      "MuiDataGrid",
      ThemeType
    >
  }
}

export type TConvertPxToRem = (
  htmlFontSize: number,
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
) => string

export enum ModeEnum {
  DARK = "darkMode",
  DEFAULT = "default",
  PRIMARY = "primary",
}
