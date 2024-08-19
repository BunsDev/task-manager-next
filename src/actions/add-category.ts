"use server";
import { revalidatePath } from "next/cache";
import { Category } from "@/providers/category-context";
import prisma from "@/db/prisma";
import { auth } from "@/auth";

export async function addCategory(name: string) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }
    try {
        const newCategory = await prisma.category.create({
            data: {
                name: name,
                ownerId: session.user.id,
            },
            include: {
                projects: true,
            },
        });

        revalidatePath("/projects");
        return newCategory as Category;
    } catch (error: any) {
        throw new Error(`Unable to create Category: ${error.message}`);
    } finally {
        revalidatePath("/projects");
    }
}
