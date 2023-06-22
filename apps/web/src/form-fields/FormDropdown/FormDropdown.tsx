import { FieldValues, useController } from "react-hook-form"
import { Dropdown } from "@components/Dropdown"
import { IFormDropdown } from "./types"

export const FormDropdown = <T extends FieldValues>({
  name,
  label,
  options,
  control,
  initialValue,
}: IFormDropdown<T>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: options.length
      ? initialValue
      : (undefined as typeof initialValue),
  })
  return (
    <Dropdown
      id={name}
      label={label}
      name={name}
      value={field.value}
      inputRef={field.ref}
      options={options}
      onChange={field.onChange}
    />
  )
}
