import { ChangeEvent } from "react"

export interface IPagination {
  count: number
  dataTest?: string
  onChange: (value: number, event: ChangeEvent<unknown>) => void
  page: number
}

export interface ITablePagination extends IPagination {}
