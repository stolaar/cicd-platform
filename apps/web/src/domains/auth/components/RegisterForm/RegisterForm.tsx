import { FC } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRegister, validationSchema } from "./validation/validation-schema"
import { FormTextField } from "@form-fields"
import { signIn } from "next-auth/react"
import { StyledRegisterFormContainer } from "./RegisterForm.styled"
import { ContainedButton } from "@components"
import { useMutation } from "@tanstack/react-query"
import { DataService } from "@services"

export const RegisterForm: FC = () => {
  const methods = useForm<TRegister>({
    resolver: zodResolver(validationSchema),
  })

  const registerMutation = useMutation({
    mutationFn: DataService.register, //  postman
    mutationKey: DataService.register.queryKey,
    onSuccess: async (_, variables) => {
      await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        callbackUrl: "/",
      })
    },
  })

  const onSubmit = (data: TRegister) => {
    registerMutation.mutate({ email: data.email, password: data.password })
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <StyledRegisterFormContainer>
        <FormTextField
          name={"email"}
          label={"Email"}
          control={methods.control}
        />
        <FormTextField
          type={"password"}
          name={"password"}
          label={"Password"}
          control={methods.control}
        />
        <FormTextField
          type={"password"}
          name={"confirmPassword"}
          label={"Confirm password"}
          control={methods.control}
        />
        <ContainedButton disabled={!methods.formState.isValid} type={"submit"}>
          Submit
        </ContainedButton>
      </StyledRegisterFormContainer>
    </form>
  )
}
