import { TWEETS } from "@/data/test-data";
import Tweet from "./Tweet";

export default function Tweets() {
  return (
    <div>
      {TWEETS.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
