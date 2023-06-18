import { ForwardedRef } from "react"
import { ButtonProps } from "@mui/material"

export interface IButton<T>
  extends Pick<
    ButtonProps,
    | "children"
    | "className"
    | "color"
    | "disableElevation"
    | "disableRipple"
    | "disableTouchRipple"
    | "disabled"
    | "fullWidth"
    | "onClick"
    | "size"
    | "type"
  > {
  ref: ForwardedRef<T>
  rightIcon?: ButtonProps["endIcon"]
  leftIcon?: ButtonProps["startIcon"]
  variant?: "text" | "outlined" | "contained"
}

export interface IButtonVariant<T>
  extends Omit<IButton<T>, "variant" | "ref"> {}
