import ComposeTweet from "@/components/ComposeTweet";
import Tweets from "@/components/Tweets";
import { Tweet as ITweet } from "../../../types/tweet.interface";

import { getTweets } from "@/services/tweets.service";

export default async function ForYou() {
  const tweets = await getTweets();
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={tweets} />
    </div>
  );
}
