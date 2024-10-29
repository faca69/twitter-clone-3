import { TWEETS } from "@/data/test-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams?.get("searchTerm");

  if (!searchTerm) {
    return NextResponse.json(TWEETS);
  }

  const filteredTweets = TWEETS.filter((tweet) =>
    tweet.text.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  return NextResponse.json(filteredTweets);
}
