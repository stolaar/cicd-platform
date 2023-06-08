import { INavItem } from "@components/SideBar"
import { Apps, Settings } from "@mui/icons-material"

export const navItems: INavItem[] = [
  {
    label: "Apps",
    href: "/",
    icon: <Apps />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
]

export const isActive = (href: string, pathname: string) => {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname.startsWith(href)
}
