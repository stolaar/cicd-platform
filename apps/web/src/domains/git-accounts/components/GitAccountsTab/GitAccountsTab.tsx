import { FC } from "react"
import { TabPanel } from "@mui/lab"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"
import { GitHub } from "@mui/icons-material"
import { Gitlab } from "@components"

export const GitAccountsTab: FC = () => {
  const router = useRouter()

  const onConnectGithubAccount = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email,repo`
    router.push(url)
  }

  const onConnectGitlabAccount = () => {
    const redirectUri = "http://localhost:3000/settings"
    const scopes = [
      "read_api",
      "read_user",
      "read_repository",
      "openid",
      "profile",
    ]
    const url = `https://gitlab.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID
    }&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join("+")}`
    router.push(url)
  }

  return (
    <TabPanel value={"git"}>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          sx={{ background: "black" }}
          variant={"contained"}
          startIcon={<GitHub />}
          onClick={onConnectGithubAccount}
        >
          Connect github account
        </Button>
        <Button
          variant={"contained"}
          startIcon={<Gitlab />}
          onClick={onConnectGitlabAccount}
        >
          Connect gitlab account
        </Button>
      </Box>
    </TabPanel>
  )
}
