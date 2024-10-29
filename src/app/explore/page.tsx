"use client";
import Tweets from "@/components/Tweets";
import { Input } from "@/components/ui/input";
import { TWEETS } from "@/data/test-data";
import { Tweet } from "@/types/tweet.interface";
import React, { useEffect, useState } from "react";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    console.log("search term changed", searchTerm);

    fetch(`http://localhost:3000/api/tweets?searchTerm=${searchTerm}`)
      .then((res) => res.json())
      .then((tweetsResponse) => setTweets(tweetsResponse));
  }, [searchTerm]);
  return (
    <div>
      <div className="p-4">
        <Input
          placeholder="Search..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Tweets tweets={tweets} />
      </div>
    </div>
  );
}
