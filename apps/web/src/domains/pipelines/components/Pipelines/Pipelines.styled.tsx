import { styled } from "@mui/material"
import { gridClasses } from "@mui/x-data-grid"
import { DataGrid } from "@components/DataGrid"

export const StyledDataGrid = styled(DataGrid)({
  [`& .${gridClasses.cell}:focus-within, & .${gridClasses.cell}:focus`]: {
    outline: "none",
  },
})
