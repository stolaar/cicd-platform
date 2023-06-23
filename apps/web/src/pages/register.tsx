import { Box } from "@mui/material"
import { Text } from "@components"
import { RegisterForm } from "@domain/auth/components/RegisterForm/RegisterForm"
import { TPage } from "../types/page"
import { UnAuthAppLayout } from "../layout/AppLayout/UnAuthAppLayout"

const RegisterPage: TPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text variant={"h1"}>Register</Text>
      <RegisterForm />
    </Box>
  )
}

RegisterPage.getLayout = (page) => <UnAuthAppLayout>{page}</UnAuthAppLayout>

export default RegisterPage
