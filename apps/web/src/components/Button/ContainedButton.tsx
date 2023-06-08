import { forwardRef } from "react"
import { IButtonVariant } from "./types"
import { Button } from "./components/Button"

export const ContainedButton = forwardRef<
  HTMLButtonElement,
  IButtonVariant<HTMLButtonElement>
>((props, ref) => <Button variant={"contained"} ref={ref} {...props} />)
