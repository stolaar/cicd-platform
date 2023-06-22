import { TextField } from "@components/TextField"
import { FieldValues, useController } from "react-hook-form"
import { IFormInputFieldProps } from "./types"

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  ...props
}: IFormInputFieldProps<T>) => {
  const { field } = useController({
    control,
    name,
  })

  return (
    <TextField {...field} {...props}>
      {props.children}
    </TextField>
  )
}
