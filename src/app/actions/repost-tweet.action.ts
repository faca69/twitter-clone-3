"use server";

import { TweetCreateModel } from "@/db/schemas/tweet.schema";
import { createTweet } from "@/services/tweets.service";
import { TweetType } from "@/types/tweet-type.enum";
import { revalidatePath } from "next/cache";

export async function repostTweet(formData: FormData) {
  const text = formData.get("text") as string;

  const originalTweetId = formData.get("originalTweetId") as string;

  const tweet: TweetCreateModel = {
    text,
    originalTweetId,
    type: TweetType.Repost,
  };

  await createTweet(tweet);

  revalidatePath("/feed", "page");
}
