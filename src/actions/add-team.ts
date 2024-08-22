
"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateTeamMemberParams = {
    userId: string;
    projectId: string;
    role: Role;
};

export const createTeamMember = async ({
    userId,
    projectId,
    role,
}: CreateTeamMemberParams) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const teamMember = await prisma.teamMember.create({
            data: {
                userId,
                projectId,
                role,
                createdBy: session.user.id,
            },
            include: {
                user: true,
                project: true,
            },
        });

        return teamMember;
    } catch (error) {
        console.error("Error creating team member:", error);
        throw error;
    } finally {
        await revalidatePath("/team");
    }
};

