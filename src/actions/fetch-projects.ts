"use server";

import prisma from "@/db/prisma";
import { auth } from "@/auth";

export async function fetchProject() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }
    try {
        const res = await prisma.project.findMany({
            where: {
                ownerId: session.user.id,
            },
            include: {
                categories: true,
                tasks: true,
            },
        });
        return res;
    } catch (error) {
        throw new Error("Unable to fetch Projects");
    }
}
