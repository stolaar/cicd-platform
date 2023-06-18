import { DataGridProps, GridSortModel } from "@mui/x-data-grid"

export type { GridColDef as BaseGridColDef } from "@mui/x-data-grid"
export type { GridRenderCellParams as BaseGridRenderCellParams } from "@mui/x-data-grid"
export type { GridSortModel as BaseGridSortModel } from "@mui/x-data-grid"
export type { GridValueFormatterParams as BaseGridValueFormatterParams } from "@mui/x-data-grid"
export type { GridValueGetterParams as BaseGridValueGetterParams } from "@mui/x-data-grid"
export type { GridRowParams as BaseGridRowParams } from "@mui/x-data-grid"

export interface IDataGrid
  extends Pick<
    DataGridProps,
    | "autoHeight"
    | "autoPageSize"
    | "className"
    | "columnBuffer"
    | "columns"
    | "componentsProps"
    | "slots"
    | "density"
    | "getRowId"
    | "getRowHeight"
    | "getRowSpacing"
    | "getRowClassName"
    | "columnHeaderHeight"
    | "hideFooter"
    | "initialState"
    | "loading"
    | "onPaginationModelChange"
    | "onRowClick"
    | "onRowDoubleClick"
    | "onSortModelChange"
    | "rowCount"
    | "rows"
    | "sortingMode"
    | "checkboxSelection"
    | "isRowSelectable"
    | "sortModel"
    | "rowHeight"
  > {}

export interface IDataGridSortModel {
  sortModel: GridSortModel | []
}
