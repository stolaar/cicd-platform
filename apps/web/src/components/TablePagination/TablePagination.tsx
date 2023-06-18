import { Pagination } from "./components/Pagination"
import { ITablePagination } from "./types"

export const TablePagination = ({
  count,
  dataTest = "TablePagination",
  onChange,
  page,
}: ITablePagination) => (
  <Pagination
    count={count}
    page={page}
    onChange={onChange}
    dataTest={dataTest}
  />
)
