import { FC, useState } from "react"
import { Box } from "@mui/material"
import { Tabs } from "@components/Tabs/Tabs"

export const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState("git")
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}
    >
      <Tabs
        activeTab={activeTab}
        onChange={(value) => setActiveTab(value)}
        tabs={[
          { label: "Git accounts", value: "git" },
          { label: "Cloud accounts", value: "cloud" },
        ]}
      />
      <Box
        sx={{
          flex: 1,
          background: "white",
          minWidth: "100%",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      ></Box>
    </Box>
  )
}
