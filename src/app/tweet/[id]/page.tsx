type TweetDetailsProps = {
  params: { id: string };
};

export default function TweetDetails({ params: { id } }: TweetDetailsProps) {
  return <div>the tweet: {id}</div>;
}