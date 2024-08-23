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

    // Fetch all projects for the current user
    const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        select: {
            createdAt: true, // Fetch only the creation date
        },
    });

    // Initialize all days of the week with a count of 0 and prev3hourcount of 0
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const groupedProjects = daysOfWeek.reduce((acc, day) => {
        acc[day] = { count: 0, prev3hourcount: 0 };
        return acc;
    }, {} as { [key: string]: { count: number; prev3hourcount: number } });

    // Helper function to get the day of the week (e.g., "Monday")
    const getDayOfWeek = (date: Date) => {
        return daysOfWeek[date.getDay()];
    };

    // Current date and time
    const now = new Date();

    // Update the counts based on the actual project data
    projects.forEach((project) => {
        const projectDate = new Date(project.createdAt);
        const dayOfWeek = getDayOfWeek(projectDate);

        // Update the daily count
        groupedProjects[dayOfWeek].count += 1;

        // If the project is created today, update the prev3hourcount
        if (dayOfWeek === getDayOfWeek(now)) {
            const timeDiff = now.getTime() - projectDate.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert time difference to hours

            if (hoursDiff <= 3) {
                groupedProjects[dayOfWeek].prev3hourcount += 1;
            }
        }
    });

    // Transform the data into the format needed
    const chartData = Object.entries(groupedProjects).map(
        ([day, { count, prev3hourcount }]) => ({
            day,
            count,
            prev3hourcount,
        })
    );

    return chartData;
}
