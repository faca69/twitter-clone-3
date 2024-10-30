"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { submitTweet } from "@/app/actions/create-tweet";

export default function ComposeTweet() {
  const [value, setValue] = useState("");
  return (
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
          await submitTweet(formData);
        }}
      >
        <Textarea
          className="w-full border-t-0 border-l-0 border-r-0 "
          placeholder="What is happening?"
          name="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          className="mt-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white"
          disabled={!value}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
