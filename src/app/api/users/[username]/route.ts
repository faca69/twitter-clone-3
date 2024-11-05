import { getUserByUsername } from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  return NextResponse.json(user);
}
