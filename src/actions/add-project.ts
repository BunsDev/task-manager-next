"use server";

import prisma from "@/db/prisma"; // Import your Prisma client
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function addProject({
  name,
  categoryIds,
}: {
  name: string;
  categoryIds: string[];
}) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        owner: {
          connect: { id: session.user.id },
        },
      },
      include: {
        categories: true,
        tasks: true,
      },
    });
    
    return project;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw new Error("Unable to create project");
  } finally {
    revalidatePath("/projects");
  }
}
