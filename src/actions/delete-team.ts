"use server";

import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTeam(teamMemberId: string) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("User is not authenticated");
    }
    try {
        await prisma.teamMember.delete({
            where: { id: teamMemberId },
        });
    } catch (error) {
        throw new Error("Unable to delete Team Member");
    } finally {
        await revalidatePath("/team");
    }
}
