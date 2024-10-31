import Tweet from "./Tweet";
import { Tweet as ITweet } from "../types/tweet.interface";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";

type TweetsProps = {
  tweets: TweetExtendedModel[];
};

export default function Tweets({ tweets }: TweetsProps) {
  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
