import { getTweets } from "@/services/tweets.service";
import ComposeTweet from "./ComposeTweet";
import Tweets from "./Tweets";

import { Tweet as ITweet } from "../types/tweet.interface";

export default async function ForYou() {
  const tweets = await getTweets();
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={tweets as unknown as ITweet[]} />
    </div>
  );
}
