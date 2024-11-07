import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "../../../services/users.service";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams?.get("searchTerm");

  const users = await searchUsers(searchTerm ?? "");

  return NextResponse.json(users);
}
