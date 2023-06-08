import { IButton } from "../types"
import { Button as MUIButton } from "@mui/material"

export const Button = <T extends HTMLButtonElement>({
  children,
  className,
  color = "primary",
  disabled,
  disableElevation,
  disableRipple,
  disableTouchRipple,
  fullWidth,
  onClick,
  ref,
  rightIcon,
  size,
  type,
  variant,
}: IButton<T>) => (
  <MUIButton
    className={className}
    color={color}
    disableElevation={disableElevation}
    disableRipple={disableRipple}
    disableTouchRipple={disableTouchRipple}
    disabled={disabled}
    endIcon={rightIcon}
    fullWidth={fullWidth}
    onClick={onClick}
    ref={ref}
    size={size}
    type={type}
    variant={variant}
  >
    {children}
  </MUIButton>
)
