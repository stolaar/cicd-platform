import { z } from "zod"

export const pipelineSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  branch: z.string(),
  repositoryId: z.string(),
})

export type TPipeline = z.infer<typeof pipelineSchema>
