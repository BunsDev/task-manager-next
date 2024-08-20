"use server";

import prisma from "@/db/prisma"
import { Project } from "@/providers/project-context";

export async function updateProject(id: string, data: {
  name?: string;
  description?: string | null;
  categories?: { id: string }[];
}) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        categories: {
          set: data.categories?.map(cat => ({ id: cat.id })) || [],
        },
      },
      include: {
        categories: true,
      },
    });

    return updatedProject as unknown as Project;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Unable to update project");
  }
}
