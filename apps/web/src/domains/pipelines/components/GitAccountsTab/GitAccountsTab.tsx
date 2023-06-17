import { FC, useEffect, useRef } from "react"
import { TabPanel } from "@mui/lab"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material"
import { useRouter } from "next/router"
import { GitHub } from "@mui/icons-material"
import { Gitlab, Text } from "@components"
import { DataService } from "@services"
import { useMutation, useQuery } from "@tanstack/react-query"

export const GitAccountsTab: FC = () => {
  const router = useRouter()
  const datasourceCodeRef = useRef(false)

  const connectDatasourceMutation = useMutation({
    mutationFn: DataService.connectDatasource,
    mutationKey: DataService.connectDatasource.queryKey,
  })

  const { data = [] } = useQuery({
    queryKey: DataService.getDatasources.queryKey(),
    queryFn: DataService.getDatasources,
  })

  useEffect(() => {
    if (router.query.code && !datasourceCodeRef.current) {
      connectDatasourceMutation.mutate({
        code: router.query.code as string,
        provider: "gitlab",
      })
      router.replace(router.pathname)
      datasourceCodeRef.current = true
    }
  }, [router.query])

  const onConnectGithubAccount = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email,repo`
    router.push(url)
  }

  const onConnectGitlabAccount = () => {
    const redirectUri = "http://localhost:3000/settings"
    const scopes = [
      "api",
      "read_api",
      "read_user",
      "read_repository",
      "write_repository",
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
        <Box>
          <Text variant={"h4"}>Connected accounts</Text>
          <Divider sx={{ marginBottom: "15px" }} />
          {data.map(({ provider, name }) => (
            <Card key={name}>
              <CardHeader
                sx={{ textTransform: "capitalize" }}
                title={provider}
              />
              <CardContent>{name}</CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </TabPanel>
  )
}
