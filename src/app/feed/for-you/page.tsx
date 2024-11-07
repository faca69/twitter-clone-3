import ComposeTweet from "@/components/ComposeTweet";
import Tweets from "@/components/Tweets";

import { getTweets } from "@/services/tweets.service";

const dynamic = "force-dynamic";

export default async function ForYou() {
  const tweets = await getTweets();
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={tweets} />
    </div>
  );
}
