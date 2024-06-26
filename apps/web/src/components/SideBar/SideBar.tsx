import { FC, useState } from "react"
import { ISideBar } from "./types"
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { StyledDrawer, StyledListButton } from "./SideBar.styled"
import { ChevronLeft, ChevronRight, Logout } from "@mui/icons-material"
import { useRouter } from "next/router"
import {
  isActive,
  navItems as items,
} from "@components/SideBar/utils/nav-items"
import { signOut } from "next-auth/react"

export const SideBar: FC<ISideBar> = ({ navItems = items }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onLogout = () => {
    signOut({
      callbackUrl: "/login",
    })
  }

  return (
    <StyledDrawer variant={"permanent"} open={open}>
      <IconButton onClick={() => setOpen((prev) => !prev)}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <List>
        {navItems.map(({ label, href, icon, onClick }) => {
          const isTabActive = isActive(href ?? "", router.pathname)
          return (
            <ListItem key={label} sx={{ display: "block" }}>
              <StyledListButton
                selected={isTabActive}
                onClick={onClick ?? (() => router.push(href ?? "/"))}
                open={open}
                sx={{
                  fontWeight: isTabActive ? "bolder" : "inherit",
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  {label}
                </ListItemText>
              </StyledListButton>
            </ListItem>
          )
        })}
      </List>
      <IconButton
        onClick={onLogout}
        sx={{ marginTop: "auto", marginBottom: "30px" }}
      >
        <Logout />
      </IconButton>
    </StyledDrawer>
  )
}
