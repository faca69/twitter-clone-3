import { getUserByUsername } from "../../../../services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { username: string } }
) {
  const { username } = context.params;
  const user = await getUserByUsername(username);

  return NextResponse.json(user);
}
