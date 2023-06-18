import { useContext } from "react"
import { PipelineInfoContext } from "@domain/pipelines/components/Pipelines/providers/PipelineInfoProvider"

export const usePipelineInfo = () => {
  const context = useContext(PipelineInfoContext)
  if (!context) {
    throw new Error(
      "usePipelineInfo must be used within a PipelineInfoProvider",
    )
  }

  return context
}
