import { TWEETS } from "@/data/test-data";
import ComposeTweet from "./ComposeTweet";
import Tweets from "./Tweets";

export default function Following() {
  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={[]} />
    </div>
  );
}
