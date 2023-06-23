import { Box } from "@mui/material"
import { Text } from "@components"
import { LoginForm } from "@domain/auth/components/LoginForm/LoginForm"
import { TPage } from "../types/page"
import { UnAuthAppLayout } from "../layout/AppLayout/UnAuthAppLayout"

const LoginPage: TPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Text variant={"h1"}>Login</Text>
      <LoginForm />
    </Box>
  )
}

LoginPage.getLayout = (page) => <UnAuthAppLayout>{page}</UnAuthAppLayout>

export default LoginPage
