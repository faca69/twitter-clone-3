"use client";

import { useEffect, useState } from "react";
import { TweetExtendedModel } from "../../../db/schemas/tweet.schema";
import Tweets from "@/components/Tweets";

export default function Likes({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tweets/user/${userId}/likes`)
      .then((res) => res.json())
      .then((tweetsRes) => setTweets(tweetsRes));
  }, [userId]);

  return <Tweets tweets={tweets} />;
}
