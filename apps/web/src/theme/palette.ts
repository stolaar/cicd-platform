import { alpha } from "@mui/material"
import { colors } from "./constants"
import {
  IBackground,
  IPaletteColorVariants,
  IPaletteVariants,
  IThemeText,
} from "./types"

const {
  errorDark,
  errorLight,
  errorMain,
  infoDark,
  infoLight,
  infoMain,
  secondaryWhite,
  successDark,
  successLight,
  successMain,
  textDisabled,
  textPrimary,
  textSecondary,
  warningDark,
  warningLight,
  warningMain,
  white,
} = colors

declare module "@mui/material/styles" {
  interface Palette extends IPaletteVariants {}
  interface PaletteColor extends IPaletteColorVariants {}
  interface TypeBackground extends IBackground {}
  interface TypeText extends IThemeText {}
}

export const palette = {
  error: {
    "12p": alpha(errorMain, 0.12),
    "160p": `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${errorMain}`,
    "190p": `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${errorMain}`,
    "30p": alpha(errorMain, 0.3),
    "30pRipple":
      "radial-gradient(36.59% 100.8% at 50% 50%, rgba(211, 47, 47, 0.3) 99.54%, rgba(255, 255, 255, 0) 100%)",
    "4p": alpha(errorMain, 0.04),
    "50p": alpha(errorMain, 0.5),
    "8p": alpha(errorMain, 0.08),
    contrast: white,
    dark: errorDark,
    light: errorLight,
    main: errorMain,
  },
  info: {
    "12p": alpha(infoMain, 0.12),
    "160p": `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${infoMain}`,
    "190p": `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${infoMain}`,
    "30p": alpha(infoMain, 0.3),
    "30pRipple":
      "radial-gradient(36.59% 100.8% at 50% 50%, rgba(201, 205, 217, 0.3) 99.54%, rgba(255, 255, 255, 0) 100%)",
    "4p": alpha(infoMain, 0.04),
    "50p": alpha(infoMain, 0.5),
    "8p": alpha(infoMain, 0.08),
    contrast: textPrimary,
    dark: infoDark,
    light: infoLight,
    main: infoMain,
  },
  success: {
    "12p": alpha(successMain, 0.12),
    "160p": `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${successMain}`,
    "190p": `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${successMain}`,
    "30p": alpha(successMain, 0.3),
    "30pRipple":
      "radial-gradient(36.59% 100.8% at 50% 50%, rgba(15, 212, 142, 0.3) 99.54%, rgba(255, 255, 255, 0) 100%)",
    "4p": alpha(successMain, 0.04),
    "50p": alpha(successMain, 0.5),
    "8p": alpha(successMain, 0.08),
    contrast: textPrimary,
    dark: successDark,
    light: successLight,
    main: successMain,
  },
  text: {
    disabled: textDisabled,
    primary: textPrimary,
    secondary: textSecondary,
    secondaryWhite,
    white,
  },
  warning: {
    "12p": alpha(warningMain, 0.12),
    "160p": `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${warningMain}`,
    "190p": `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${warningMain}`,
    "30p": alpha(warningMain, 0.3),
    "30pRipple":
      "radial-gradient(36.59% 100.8% at 50% 50%, rgba(237, 108, 2, 0.3) 99.54%, rgba(255, 255, 255, 0) 100%)",
    "4p": alpha(warningMain, 0.04),
    "50p": alpha(warningMain, 0.5),
    "8p": alpha(warningMain, 0.08),
    contrast: white,
    dark: warningDark,
    light: warningLight,
    main: warningMain,
  },
}
