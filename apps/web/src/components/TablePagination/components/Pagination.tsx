import { Pagination as MUIPagination } from "@mui/material"
import { IPagination } from "../types"

export const Pagination = ({
  count,
  dataTest = "TablePagination",
  onChange,
  page,
}: IPagination) => (
  <MUIPagination
    data-testid={dataTest}
    shape="rounded"
    disabled={count === 1}
    count={count}
    page={page}
    onChange={(event, nextPage) => onChange(nextPage, event)}
    boundaryCount={2}
    siblingCount={0}
  />
)
