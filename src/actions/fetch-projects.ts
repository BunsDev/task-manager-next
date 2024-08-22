"use server";

import prisma from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function fetchProject() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }
    try {
        const res = await prisma.project.findMany({
            where: {
                ownerId: session.user.id,
            },
            include: {
                categories: true,
                tasks: true,
            },
        });
        return res;
    } catch (error) {
        throw new Error("Unable to fetch Projects");
    }
}

export async function fetchProjectName(currentProjectId: string) {
    try {
        const project = await prisma.project.findFirst({
            where: {
                id: currentProjectId,
            },
            select: {
                name: true,
            },
        });

        if (project) {
            return project.name;
        } else {
            throw new Error("Project not found");
        }
    } catch (error) {
        console.error("Error fetching project name:", error);
        throw error;
    }
}

type ProjectProgress = {
    total: number;
    completed: number;
    progress: number;
};

export async function getProjectProgress(
    projectId: string
): Promise<ProjectProgress> {
    try {
        const totalTasks = await prisma.task.count({
            where: {
                projectId: projectId,
            },
        });

        const completedTasks = await prisma.task.count({
            where: {
                projectId: projectId,
                status: "COMPLETED",
            },
        });

        const progress =
            totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0;

        return {
            total: totalTasks,
            completed: completedTasks,
            progress: progress,
        };
    } catch (error) {
        console.error("Error fetching project progress:", error);
        throw new Error("Unable to fetch project progress");
    } finally {
        revalidatePath("/projects");
    }
}

export async function getProjectsForTeam() {
    const session = await auth();

    try {
        if (!session || !session.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.user.id;

        const projects = await prisma.project.findMany({
            where: {
                ownerId: userId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        return projects;
    } catch (error) {
        console.error("Error fetching projects for team:", error);
        throw error;
    }
}

// Function to fetch all users
