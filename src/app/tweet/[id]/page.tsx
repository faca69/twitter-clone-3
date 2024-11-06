import Tweet from "@/components/Tweet";
import { getTweetById } from "@/services/tweets.service";

type TweetDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function TweetDetails({ params }: TweetDetailsProps) {
  const { id } = await params;
  const tweet = await getTweetById(id);

  if (!tweet) {
    return <h1>Tweet not found</h1>;
  }

  return <Tweet tweet={tweet} />;
}
