// "use server"
// import prisma from "@/db/prisma";

// export const createTeamMember = async () => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: "cm02p3jk6000vjm3i4o1viku3",
//     },
//   });

//   if (!user) {
//     throw new Error(`User with ID cm02p3jk6000vjm3i4o1viku3 not found.`);
//   }

//   const teamMember = await prisma.teamMember.create({
//     data: {
//       userId: "cm02p3jk6000vjm3i4o1viku3",
//       projectId : "cm02d92670000upb7y78xdy6b",
//       role : "EDITOR",
//       createdBy: "cm027rv2v00001s5j072u5qv2"
//     },
//     include: {
//       user: true,
//       project: true,
//     },
//   });

//   return teamMember;
// };

// actions/team-actions.ts
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

