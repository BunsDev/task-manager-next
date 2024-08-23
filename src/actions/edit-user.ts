"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserName(userEmail: string, newName: string) {
    try {
        const updatedUser = await prisma.user.update({
            where: { email: userEmail },
            data: { name: newName },
        });
        return updatedUser;
    } catch (error) {
        console.error("Failed to update user name:", error);
        throw new Error("Failed to update user name");
    } finally {
        await revalidatePath("/account");
        await revalidatePath("/");
    }
}
