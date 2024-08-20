"use server";

import prisma from "@/db/prisma";

export async function fetchTasks(currentProjectId: string) {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: currentProjectId,
            },
        });
        return tasks;
    } catch (error) {
        throw new Error("Unable to fetch Task");
    }
}

export async function fetchSingleTask(taskId: string) {
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
            },
        });
        return task;
    } catch (error) {
        throw new Error("Unable to fetch Task");
    }
}
