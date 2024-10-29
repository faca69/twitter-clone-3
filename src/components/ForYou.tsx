import { TWEETS } from "@/data/test-data";
import ComposeTweet from "./ComposeTweet";
import Tweets from "./Tweets";

export default function ForYou() {
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={TWEETS} />
    </div>
  );
}
