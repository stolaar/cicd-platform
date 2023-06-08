import { FC } from "react"
import { ITabs } from "./types"
import { Tab, Tabs as MUITabs } from "@mui/material"

export const Tabs: FC<ITabs> = ({ tabs, onChange, activeTab }) => {
  return (
    <MUITabs value={activeTab} onChange={(_, value) => onChange(value)}>
      {tabs.map(({ label, value }) => (
        <Tab key={value} value={value} label={label} />
      ))}
    </MUITabs>
  )
}
