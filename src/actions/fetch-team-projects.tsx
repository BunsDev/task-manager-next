"use server"

import { auth } from "@/auth";
import prisma from "@/db/prisma";

export async function fetchTeamProject() {
    const session = await auth();

    try {
        if (!session || !session.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.user.id;

        const projects = await prisma.teamMember.findMany({
            where: {
                userId: userId,
            },
            include: {
                project: {
                    include: {
                        categories: true, 
                    },
                },
            },
        });

        return projects ;
    } catch (error) {
        console.error("Error fetching projects for team:", error);
        throw error;
    }
}
