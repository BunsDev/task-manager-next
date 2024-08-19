import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']), // Adjust based on your actual enum values
  deadline: z.date(),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'CANCELLED']), // Adjust based on your actual enum values
  projectId: z.string(),
})

export type Task = z.infer<typeof taskSchema>