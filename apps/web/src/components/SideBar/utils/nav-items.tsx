import { INavItem } from "@components/SideBar"
import { Apps, Settings, Polyline } from "@mui/icons-material"

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
  {
    label: "Pipelines",
    href: "/pipelines",
    icon: <Polyline />,
  },
]

export const isActive = (href: string, pathname: string) => {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname.startsWith(href)
}
