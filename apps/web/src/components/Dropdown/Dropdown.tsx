import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { IDropdown } from "./types"
import { FC } from "react"

export const Dropdown: FC<IDropdown> = ({
  label,
  id = "select",
  value,
  options,
  inputRef,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        label={label}
        inputRef={inputRef}
        value={value ?? ""}
        onChange={onChange}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
