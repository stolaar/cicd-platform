import { FC, forwardRef } from "react"
import { ITextField } from "./types"
import { TextField as MUITextField } from "@mui/material"

export const TextField: FC<ITextField> = forwardRef<
  HTMLInputElement,
  ITextField
>(({ label, helperText, type = "text", inputProps, onChange }, ref) => {
  return (
    <MUITextField
      label={label}
      type={type}
      helperText={helperText}
      inputProps={inputProps}
      onChange={(e) => onChange && onChange(e.target.value)}
      ref={ref}
    />
  )
})
