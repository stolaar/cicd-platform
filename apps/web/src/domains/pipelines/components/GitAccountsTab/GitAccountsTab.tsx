import { FC, useEffect, useRef } from "react"
import { TabPanel } from "@mui/lab"
import { Avatar, Box } from "@mui/material"
import { useRouter } from "next/router"
import { GitHub } from "@mui/icons-material"
import { ContainedButton, Gitlab, Text } from "@components"
import { DataService } from "@services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LABELS } from "./utils/labels"
import {
  githubAuthUrl,
  gitlabAuthUrl,
} from "@domain/pipelines/components/GitAccountsTab/utils/config"
import {
  StyledButtonsContainer,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledContainer,
  StyledDivider,
  StyledGithubButton,
} from "@domain/pipelines/components/GitAccountsTab/GitAccountsTab.styled"

export const GitAccountsTab: FC = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const datasourceCodeRef = useRef(false)

  const connectDatasourceMutation = useMutation({
    mutationFn: DataService.connectCodeHostingProvider,
    mutationKey: DataService.connectCodeHostingProvider.queryKey,
    onSuccess: () =>
      queryClient.invalidateQueries(
        DataService.getCodeHostingProviders.queryKey(),
      ),
  })

  const { data = [] } = useQuery({
    queryKey: DataService.getCodeHostingProviders.queryKey(),
    queryFn: DataService.getCodeHostingProviders,
  })

  useEffect(() => {
    if (router.query.code && !datasourceCodeRef.current) {
      connectDatasourceMutation.mutate({
        code: router.query.code as string,
        provider: router.query.provider ?? "gitlab",
      })
      router.replace("/settings")
      datasourceCodeRef.current = true
    }
  }, [router.query])

  const onConnectGithubAccount = () => {
    router.push(githubAuthUrl)
  }

  const onConnectGitlabAccount = () => {
    router.push(gitlabAuthUrl)
  }

  return (
    <TabPanel value={"git"}>
      <StyledContainer>
        <StyledButtonsContainer>
          <StyledGithubButton
            leftIcon={<GitHub />}
            onClick={onConnectGithubAccount}
          >
            {LABELS.connectGithub}
          </StyledGithubButton>
          <ContainedButton
            leftIcon={<Gitlab />}
            onClick={onConnectGitlabAccount}
          >
            {LABELS.connectGitlab}
          </ContainedButton>
        </StyledButtonsContainer>
        <Box>
          <Text variant={"h3"}>{LABELS.connectedAccounts}</Text>
          <StyledDivider />
          <Box sx={{ display: "flex", gap: "15px" }}>
            {data.map(({ provider, name, avatarUrl }) => (
              <StyledCard key={name}>
                <StyledCardHeader title={provider} />
                <StyledCardContent>
                  {avatarUrl && <Avatar src={avatarUrl} alt={name} />}
                  <Text variant={"subtitle2"}>@{name}</Text>
                </StyledCardContent>
              </StyledCard>
            ))}
          </Box>
        </Box>
      </StyledContainer>
    </TabPanel>
  )
}
