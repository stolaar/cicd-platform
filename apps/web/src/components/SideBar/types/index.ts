import { DrawerProps } from "@mui/material"

export interface INavItem {
  label: string
  href?: string
  icon: JSX.Element
  onClick?: () => void
}

export interface ISideBar extends DrawerProps {
  navItems: INavItem[]
}
