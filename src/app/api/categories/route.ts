import { NextResponse } from "next/server";
import { fetchCategory } from "@/actions/fetch-category";

export async function GET() {
  try {
    const data = await fetchCategory();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/categories:", error);
    return NextResponse.error();
  }
}
