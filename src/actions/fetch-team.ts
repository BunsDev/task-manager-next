"use server";
import { auth } from "@/auth";
import prisma from "@/db/prisma";

export async function fetchTeam() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }

    const userId = session.user.id;

    try {
        const teamMembers = await prisma.teamMember.findMany({
            where: {
                createdBy: userId,
            },
            include: {
                user: true,
                project: true,
            },
        });

        return teamMembers;
    } catch (error) {
        throw new Error("Unable to fetch Team Members");
    }
}
