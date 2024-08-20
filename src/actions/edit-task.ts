"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function editTask(formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as "LOW" | "MEDIUM" | "HIGH";
    const deadline = new Date(formData.get("deadline") as string);
    const status = formData.get("status") as
        | "COMPLETED"
        | "IN_PROGRESS"
        | "CANCELLED";

    try {
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                priority,
                deadline,
                status,
            },
        });

        revalidatePath(`/projects/${updatedTask.projectId}`);
        return updatedTask;
    } catch (error) {
        console.error("Failed to update task:", error);
        throw new Error("Failed to update task");
    }
}
