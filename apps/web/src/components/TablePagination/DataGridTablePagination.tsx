import { FC } from "react"
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid"
import { Pagination } from "./components/Pagination"

export const DataGridTablePagination: FC = () => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      data-testid="TablePagination"
      count={pageCount}
      page={page + 1}
      onChange={(nextPage: number) => apiRef.current.setPage(nextPage - 1)}
    />
  )
}
