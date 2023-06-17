import { ReactNode } from "react"

export interface IDialog {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}
