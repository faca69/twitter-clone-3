"use client";

import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { CornerRightUp, Heart, MessageCircle, Repeat } from "lucide-react";
import { Link as LinkLucide } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import { TweetType } from "@/types/tweet-type.enum";
import { cn } from "@/lib/utils";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { repostTweet } from "@/app/actions/repost-tweet.action";
import { useSession } from "next-auth/react";
import likeTweetAction from "@/app/actions/like-tweet.action";

type TweetProps = {
  tweet: TweetExtendedModel;
};

export default function Tweet({ tweet }: TweetProps) {
  const { data: session } = useSession();

  const isLikedByCurrentUser = tweet.likes.some(
    (like) => like.userId === session?.user.id
  );
  return (
    <div
      className={cn("flex flex-col", tweet.type === TweetType.Tweet && "pt-4")}
    >
      {tweet.type === TweetType.Reply && (
        <div className="flex flex-row gap-2 items-center text-sm font-bold text-zinc-500 ml-10 mt-5 mb-2 ">
          <CornerRightUp className="size-5 cursor-pointer text-zinc-500" />
          Reply to &ldquo; {tweet.repliedTo?.text} &ldquo;
        </div>
      )}

      {tweet.type === TweetType.Repost && (
        <div className="flex flex-row gap-2 items-center text-sm font-bold text-zinc-500 ml-10 mt-5 mb-2 ">
          <Repeat className="size-5 cursor-pointer text-zinc-500" />
          {tweet.author.name} reposted
        </div>
      )}
      <div className="flex flex-row pl-4 pr-4 pb-4 gap-4 border-b border-zinc-800">
        <div>
          <Link href={tweet.author.username}>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-12 h-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="font-bold">
              <Link href={`/${tweet.author.username}`}>
                {tweet.type === TweetType.Repost
                  ? tweet.originalTweet?.author.name
                  : tweet.author.name}
              </Link>
            </h1>

            <h2 className="text-zinc-500 text-sm">
              @
              <Link href={`/${tweet.author.username}`}>
                {tweet.type === TweetType.Repost
                  ? tweet.originalTweet?.author.username
                  : tweet.author.username}
              </Link>
            </h2>
            <div className="text-zinc-500 flex items-center justify-center">
              <div>-</div>
            </div>

            <p className="text-zinc-500 hover:underline">
              <Link href={`/tweet/${tweet.id}`}>
                {formatDate(tweet.createdAt)}
              </Link>
            </p>
          </div>
          <p>{tweet.text}</p>
          <div className="flex flex-row gap-4 items-center mt-2 justify-between">
            <div>
              <Link
                href={`/feed/compose?type=${TweetType.Reply}&repliedToId=${tweet.id}`}
                className="flex flex-row gap-2 items-center"
              >
                <MessageCircle className="size-7 text-zinc-500 cursor-pointer" />
                <span>{tweet.replies?.length ?? 0}</span>
              </Link>
            </div>
            <form action={repostTweet}>
              <button className="flex flex-row gap-2 items-center">
                <Repeat className="size-7 text-zinc-500 cursor-pointer" />
                <span>{tweet.reposts.length ?? 0}</span>
              </button>
              <input type="hidden" name="text" value={tweet.text} />
              <input type="hidden" name="originalTweetId" value={tweet.id} />
            </form>
            <form
              className="flex flex-row gap-2 items-center"
              action={likeTweetAction}
            >
              <input type="hidden" name="tweetId" value={tweet.id} />
              <input
                type="hidden"
                name="isLiked"
                value={isLikedByCurrentUser ? "true" : "false"}
              />

              {!isLikedByCurrentUser ? (
                <Heart className="size-7 text-zinc-500 cursor-pointer" />
              ) : (
                <Heart className="size-7 text-red-600 cursor-pointer" />
              )}
              <span>{tweet.likes.length ?? 0}</span>
            </form>
            <div className="flex flex-row gap-2 items-center">
              <Link href={`/tweet/${tweet.id}`}>
                <LinkLucide className="size-7 text-zinc-500 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
