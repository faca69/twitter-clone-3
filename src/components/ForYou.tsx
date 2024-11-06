import { getTweets } from "@/services/tweets.service";
import ComposeTweet from "./ComposeTweet";
import Tweets from "./Tweets";

export default async function ForYou() {
  const tweets = await getTweets();
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={tweets} />
    </div>
  );
}
