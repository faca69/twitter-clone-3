"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { submitTweet } from "@/app/actions/create-tweet";
import { useSearchParams } from "next/navigation";
import { TweetModel } from "@/db/schemas/tweet.schema";
import { TweetType } from "@/types/tweet-type.enum";
import { submitReply } from "@/app/actions/reply.action";

type ComposeTweetProps = {
  onSubmit?: () => void;
};

export default function ComposeTweet({
  onSubmit = () => void 0,
}: ComposeTweetProps) {
  const [value, setValue] = useState("");
  const [originalTweet, setOriginalTweet] = useState<TweetModel>();
  const [type, setType] = useState<TweetType>(TweetType.Tweet);
  const [repliedToId, setRepliedToId] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const id = searchParams.get("repliedToId");

    setType((typeParam as TweetType) || TweetType.Tweet);

    if (type === TweetType.Reply && id) {
      setRepliedToId(id);
      fetch(`http://localhost:3000/api/tweets/${id}`)
        .then((res) => res.json())
        .then((body) => setOriginalTweet(body));
    } else {
      setRepliedToId("");
      setOriginalTweet(undefined);
    }
  }, [searchParams, type]);
  return (
    <>
      {originalTweet && (
        <div>
          <p className="italic text-zinc-400">{originalTweet.text}</p>
        </div>
      )}

      <div className="flex flex-row p-4 gap-4 border-b border-zinc-800">
        <div>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-12 h12 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <form
          className="w-full flex flex-col items-end"
          action={async (formData) => {
            if (type === TweetType.Tweet) {
              await submitTweet(formData);
            }

            if (type === TweetType.Reply) {
              await submitReply(formData);
            }
            setValue("");
            onSubmit();
          }}
        >
          <Textarea
            className="w-full border-t-0 border-l-0 border-r-0 "
            placeholder="What is happening?"
            name="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <input name="repliedToId" type="hidden" value={repliedToId} />
          <Button
            className="mt-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white"
            disabled={!value}
          >
            Post
          </Button>
        </form>
      </div>
    </>
  );
}
