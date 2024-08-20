"use server";

import prisma from "@/db/prisma";
import { auth } from "@/auth";
import { Category } from "@/providers/category-context";

export async function fetchCategory() {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    try {
        const data = await prisma.category.findMany({
            where: {
                ownerId: session.user.id,
            },
            include: {
                projects: true,
            },
        });
        
        return data as Category[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}