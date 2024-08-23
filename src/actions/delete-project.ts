"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: string) {
    try {
        await prisma.project.delete({
            where: { id: projectId },
        });
    } catch (error) {
        throw new Error("Unable to delete Project");
    } finally {
         revalidatePath("/project");
    }
}
