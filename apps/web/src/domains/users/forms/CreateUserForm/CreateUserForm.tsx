import { FC } from "react"
import { TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { ContainedButton, Text } from "@components"
import { LABELS } from "./utils"
import { ICreateUser } from "./types"
import { StyledFormContainer } from "./CreateUserForm.styled"

export const CreateUserForm: FC<ICreateUser> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Text variant={"h5"}>{LABELS.createUser}</Text>
      <TextField
        label={LABELS.name}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message?.toString() : ""}
        {...register("name")}
      />
      <ContainedButton type="submit">{LABELS.submit}</ContainedButton>
    </StyledFormContainer>
  )
}
