import { TypographyProps } from "@mui/material";

export interface IText
  extends Pick<
    TypographyProps,
    "className" | "variant" | "children" | "width"
  > {}
