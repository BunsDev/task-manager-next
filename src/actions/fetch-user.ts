"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";

export async function getAllUsersForTeam() {
    const session = await auth();
    if (!session || !session.user?.id) {
        throw new Error("User not authenticated");
    }
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return users;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}
