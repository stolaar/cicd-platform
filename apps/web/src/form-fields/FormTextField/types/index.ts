import { Control, FieldValues, Path } from "react-hook-form"
import { ITextField } from "@components/TextField"
import { TextFieldProps } from "@mui/material"

export interface IFormInputFieldProps<T extends FieldValues>
  extends ITextField {
  name: Path<T>
  control: Control<T>
  initialValue?: string
  type?: TextFieldProps["type"]
}
