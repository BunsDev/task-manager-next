import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authOptions } from "@/auth";

// Create a direct handler instead of importing from auth.ts
const handler = NextAuth(authOptions);

export const GET = handler.GET;
export const POST = handler.POST;