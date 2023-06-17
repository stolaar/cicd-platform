import { TextFieldProps } from "@mui/material"

export interface ITextField
  extends Omit<TextFieldProps, "name" | "defaultValue" | "onChange"> {
  onChange?: (value: string) => void
}
