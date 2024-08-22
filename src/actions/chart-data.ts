"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";

export async function fetchCompletedTasks() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }
    try {
        const completedTasksCount = await prisma.task.count({
            where: {
                project: {
                    ownerId: session.user.id,
                },
                status: "COMPLETED",
            },
        });
        return completedTasksCount;
    } catch (error) {
        console.error("Error fetching completed tasks:", error);
        throw new Error("Could not fetch completed tasks");
    }
}

export async function fetchTotalCategories() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }
    try {
        const totalCategories = await prisma.category.count({
            where: {
                ownerId: session.user.id,
            },
        });
        return totalCategories;
    } catch (error) {
        console.error("Error fetching total categories:", error);
        throw new Error("Could not fetch total categories");
    }
}

export async function fetchTotalTasks() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }
    try {
        const totalTasks = await prisma.task.count({
            where: {
                project: {
                    ownerId: session.user.id,
                },
            },
        });
        return totalTasks;
    } catch (error) {
        console.error("Error fetching total tasks:", error);
        throw new Error("Could not fetch total tasks");
    }
}
