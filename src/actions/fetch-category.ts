
"use server";

import { revalidatePath } from "next/cache";
import { Category } from "@/providers/category-context";
import prisma from "@/db/prisma";
import { auth } from "@/auth";

export async function fetchCategory() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }
    try {
        const data = await prisma.category.findMany({
            where: {
                ownerId:session.user.id
            },
            include: {
                projects: true,
            },
        });

        return data
        // Handle the fetched data
    } catch (error) {
        // Handle the error
        console.error("Error fetching categories:", error);
    }
}



