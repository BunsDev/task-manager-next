"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { User } from "lucide-react";

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

export async function fetchProjectForChart() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }
    try {
        const totalTeamProjects = await prisma.teamMember.count({
            where: {
                userId: session.user.id,
            },
        });
        const totalOwnedProjects = await prisma.project.count({
            where: {
                ownerId: session.user.id,
            },
        });
        return { totalTeamProjects, totalOwnedProjects };
    } catch (error) {
        console.error("Error fetching total team projects:", error);
        throw new Error("Could not fetch total team projects");
    }
}

export async function getProjectData() {
    const session = await auth(); 
    if (!session || !session.user || !session.user.id) {
      throw new Error("User is not authenticated");
    }
  
    const userId = session.user.id;
  
    // Fetch and group projects by month for the current user
    const projects = await prisma.project.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true, // Count all projects
      },
      where: {
        ownerId: userId, // Filter by the current user's ID
      },
      orderBy: {
        createdAt: "asc", // Order by creation time
      },
    });
  
    // Transform the data into the format needed for chart
    const chartData = projects.map((project) => ({
      month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        new Date(project.createdAt)
      ),
      count: project._count._all,
    }));
  
    return chartData;
  }
