import { Control, FieldValues, Path, PathValue } from "react-hook-form"
import { ITextField } from "@components/TextField"
import { IDropdownItem } from "@components/Dropdown"

export interface IFormDropdown<T extends FieldValues> extends ITextField {
  name: Path<T>
  control: Control<T>
  options: IDropdownItem[]
  label: string
  initialValue?: PathValue<T, Path<T>>
}
