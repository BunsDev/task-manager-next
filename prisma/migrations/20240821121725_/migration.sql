/*
  Warnings:

  - Added the required column `createdBy` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "createdBy" TEXT NOT NULL;
