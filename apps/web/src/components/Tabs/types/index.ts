export interface ITab {
  label: string
  value: string
}

export interface ITabs {
  tabs: ITab[]
  activeTab: string
  onChange: (value: string) => void
}
