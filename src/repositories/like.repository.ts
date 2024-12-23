import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { usersLikedTweets } from "@/db/schemas/users_liked_tweets.schema";

export const create = (tweetId: string, userId: string) =>
  db
    .insert(usersLikedTweets)
    .values({ tweetId, userId })
    .returning()
    .then((res) => res?.[0]);

export function deleteTweet(tweetId: string, userId: string) {
  return db
    .delete(usersLikedTweets)
    .where(
      and(
        eq(usersLikedTweets.tweetId, tweetId),
        eq(usersLikedTweets.userId, userId)
      )
    );
}
