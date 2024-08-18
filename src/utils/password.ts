// utils/password.ts

import { compare, hash } from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return compare(plainPassword, hashedPassword);
}