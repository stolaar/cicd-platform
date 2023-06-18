import { FC } from "react"
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid"
import { IDataGrid } from "./types"
import { DataGridTablePagination } from "../TablePagination"

export type {
  GridColDef,
  GridRowSpacingParams,
  GridValueFormatterParams,
  GridRenderCellParams,
  GridValidRowModel,
  GridRowHeightParams,
} from "@mui/x-data-grid"
export { gridClasses } from "@mui/x-data-grid"

export const DataGrid: FC<IDataGrid> = ({
  checkboxSelection,
  className,
  columnBuffer,
  columns,
  components,
  componentsProps,
  getRowId,
  getRowClassName,
  getRowSpacing,
  columnHeaderHeight = 56,
  hideFooter = false,
  initialState,
  isRowSelectable = () => false,
  loading,
  onPaginationModelChange,
  onRowClick,
  onRowDoubleClick,
  onSortModelChange,
  rowCount,
  rows,
  sortingMode = "client",
  sortModel,
  rowHeight = 88,
  getRowHeight = () => rowHeight,
}) => (
  <MUIDataGrid
    sortModel={sortModel}
    autoHeight
    className={className}
    columnBuffer={columnBuffer ?? columns.length}
    columns={columns}
    slots={{
      pagination: DataGridTablePagination,
      ...components,
    }}
    slotProps={componentsProps}
    disableColumnMenu
    rowHeight={rowHeight}
    getRowClassName={getRowClassName}
    getRowHeight={getRowHeight}
    getRowId={getRowId}
    getRowSpacing={getRowSpacing}
    columnHeaderHeight={columnHeaderHeight}
    hideFooter={hideFooter}
    initialState={initialState}
    isRowSelectable={isRowSelectable}
    loading={loading}
    onPaginationModelChange={onPaginationModelChange}
    onRowDoubleClick={onRowDoubleClick}
    onRowClick={onRowClick}
    onSortModelChange={onSortModelChange}
    pagination
    rowCount={rowCount}
    rows={rows}
    sortingMode={sortingMode}
    checkboxSelection={checkboxSelection}
  />
)
