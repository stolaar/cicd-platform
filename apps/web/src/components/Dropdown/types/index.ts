import { type Ref, ReactNode } from "react"
import { SelectChangeEvent } from "@mui/material"

export interface IDropdownItem {
  label: string
  value: string
}

export interface IDropdown {
  label: string
  id: string
  value?: string
  options: IDropdownItem[]
  name: string
  inputRef?: Ref<HTMLInputElement>
  onChange?: (e: SelectChangeEvent, child: ReactNode) => void
}
