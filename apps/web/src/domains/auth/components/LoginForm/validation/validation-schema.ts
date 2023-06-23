import { z } from "zod"

export const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type TLogin = z.infer<typeof validationSchema>
