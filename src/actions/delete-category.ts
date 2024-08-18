"use server"

import prisma from "@/db/prisma"


export async function deleteCategory(categoryId:string) {
    try {
        await prisma.category.delete({
            where:{id:categoryId}
        })
    } catch (error) {
        throw new Error("Unable to delete Project")
    }
}