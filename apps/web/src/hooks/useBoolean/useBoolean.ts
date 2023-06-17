import { useCallback, useState } from "react"
import { TUseBoolean } from "./types"

export const useBoolean: TUseBoolean = (defaultValue = false) => {
  const [value, set] = useState(defaultValue)

  const toggle = useCallback(() => {
    set((draft) => !draft)
  }, [set])

  const setTrue = useCallback(() => {
    set(true)
  }, [set])

  const setFalse = useCallback(() => {
    set(false)
  }, [set])

  return [value, { set, setFalse, setTrue, toggle }]
}
