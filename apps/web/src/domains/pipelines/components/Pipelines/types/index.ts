import { TPipeline } from "@domain/pipelines/components/Pipelines/validation/validation-schema"

export interface ICreateOrEditPipeline {
  open: boolean
  onClose: () => void
  pipeline?: TPipeline
}
