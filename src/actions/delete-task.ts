"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId: string, projectId: string) {
    try {
        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
        revalidatePath(`/projects/${projectId}`);
    } catch (error) {
        throw new Error("Unable to delete Task");
    }
}
