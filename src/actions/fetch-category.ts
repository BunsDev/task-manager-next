
"use server";

import { revalidatePath } from "next/cache";
import { Category } from "@/providers/category-context";
import prisma from "@/db/prisma"

export async function fetchCategory() {
  try {
    const data = await prisma.category.findMany({
      include:{
        projects:true
      }
    })
    return data as Category[]
  } catch (error:any) {
    throw new Error("Unable to fetch Category", error.message);
  }finally{
    revalidatePath("/projects")
  }
}
