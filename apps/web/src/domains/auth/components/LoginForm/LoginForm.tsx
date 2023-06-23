import { FC } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TLogin, validationSchema } from "./validation/validation-schema"
import { FormTextField } from "@form-fields"
import { signIn } from "next-auth/react"
import { StyledLoginFormContainer } from "./LoginForm.styled"
import { ContainedButton } from "@components"
import Link from "next/link"

export const LoginForm: FC = () => {
  const methods = useForm<TLogin>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = (data: TLogin) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    })
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <StyledLoginFormContainer>
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
        <ContainedButton disabled={!methods.formState.isValid} type={"submit"}>
          Submit
        </ContainedButton>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Link href={"/register"}>Doesn't have an account? Register now</Link>
      </StyledLoginFormContainer>
    </form>
  )
}
