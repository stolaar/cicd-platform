import { FC, useState } from "react"
import { Tabs } from "@components"
import { GitAccountsTab } from "@domain/pipelines/components"
import { TabContext } from "@mui/lab"
import {
  StyledPanelContainer,
  StyledSettingsContainer,
} from "./Settings.styled"

export const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState("git")
  return (
    <StyledSettingsContainer>
      <TabContext value={activeTab}>
        <Tabs
          activeTab={activeTab}
          onChange={(value) => setActiveTab(value)}
          tabs={[
            { label: "Git accounts", value: "git" },
            { label: "Cloud accounts", value: "cloud" },
          ]}
        />
        <StyledPanelContainer>
          <GitAccountsTab />
        </StyledPanelContainer>
      </TabContext>
    </StyledSettingsContainer>
  )
}
