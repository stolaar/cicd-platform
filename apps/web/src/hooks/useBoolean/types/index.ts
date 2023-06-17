import { Dispatch, SetStateAction } from "react"

export type TUseBoolean = (defaultValue?: boolean) => [
  boolean,
  {
    set: Dispatch<SetStateAction<boolean>>
    setFalse: () => void
    setTrue: () => void
    toggle: () => void
  },
]
