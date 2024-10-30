import Tweet from "@/components/Tweet";
import { getTweetById } from "@/services/tweets.service";
import { Tweet as ITweet } from "../../../types/tweet.interface";

type TweetDetailsProps = {
  params: { id: string };
};

export default async function TweetDetails({
  params: { id },
}: TweetDetailsProps) {
  const tweet = await getTweetById(id);

  return <Tweet tweet={tweet as unknown as ITweet} />;
}
