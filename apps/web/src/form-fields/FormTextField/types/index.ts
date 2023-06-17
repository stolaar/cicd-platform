import { Control, FieldValues, Path } from "react-hook-form"
import { ITextField } from "@components/TextField"

export interface IFormInputFieldProps<T extends FieldValues>
  extends ITextField {
  name: Path<T>
  control: Control<T>
}
