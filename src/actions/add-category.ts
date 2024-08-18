"use server"
import { revalidatePath } from "next/cache";
import { Category } from "@/providers/category-context";
import prisma from "@/db/prisma"

export async function addCategory(name: string) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
      include: {
        projects: true,
      },
    });
    return newCategory as Category
  } catch (error: any) {
    throw new Error(`Unable to create Category: ${error.message}`);
  } finally {
    revalidatePath("/projects");
  }
}
