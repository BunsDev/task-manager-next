"use server";

import prisma from "@/db/prisma"

export async function editCategory(categoryId: string, newName: string) {
  try {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: newName,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}
