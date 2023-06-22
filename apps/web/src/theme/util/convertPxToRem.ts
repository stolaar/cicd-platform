import { TConvertPxToRem } from "../types"

export const convertPxToRem: TConvertPxToRem = (htmlFontSize, ...pixels) =>
  pixels.map((pixel = 0) => `${pixel / htmlFontSize}rem`).join(" ")
