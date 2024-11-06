"use client";

import { useEffect, useState } from "react";
import { TweetExtendedModel } from "../../../db/schemas/tweet.schema";
import Tweets from "@/components/Tweets";

export default function Posts({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/user/${userId}/posts`)
      .then((res) => res.json())
      .then((tweetsRes) => setTweets(tweetsRes));
  }, [userId]);

  return <Tweets tweets={tweets} />;
}
