'use server'
import prisma from '@/db/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  status: z.enum(["COMPLETED", "IN_PROGRESS", "CANCELLED"]),
})

export async function addTask(projectId: string, formData: FormData) {
  const validatedFields = taskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    deadline: formData.get('deadline'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { title, description, priority, deadline, status } = validatedFields.data

  try {
   const res =  await prisma.task.create({
      data: {
        title,
        description,
        priority,
        deadline: new Date(deadline),
        status,
        projectId,
      },
    })

    revalidatePath(`/projects/${projectId}`)
    return res
  } catch (error) {
    return { error: 'Failed to create task' }
  }
}