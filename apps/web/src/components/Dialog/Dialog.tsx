import { FC } from "react"
import { IDialog } from "./types"
import {
  DialogContent,
  DialogTitle,
  Dialog as MUIDialog,
  DialogActions,
} from "@mui/material"

export const Dialog: FC<IDialog> = ({
  actions,
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <MUIDialog open={open} onClose={onClose} disablePortal>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "10px",
          padding: "10px",
          minWidth: "400px",
          minHeight: "400px",
        }}
      >
        <div />
        {children}
      </DialogContent>
      {!!actions && <DialogActions>{actions}</DialogActions>}
    </MUIDialog>
  )
}
