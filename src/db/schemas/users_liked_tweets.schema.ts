import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { tweets } from "./tweet.schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const usersLikedTweets = pgTable(
  "users_liked_tweets",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.tweetId] }),
  })
);

export const usersLikedTweetsRelations = relations(
  usersLikedTweets,
  ({ one }) => ({
    tweet: one(tweets, {
      fields: [usersLikedTweets.tweetId],
      references: [tweets.id],
    }),

    user: one(users, {
      fields: [usersLikedTweets.userId],
      references: [users.id],
    }),
  })
);

export type usersLikedTweetsModel = InferSelectModel<typeof usersLikedTweets>;
export type usersLikedTweetsCreateModel = InferInsertModel<
  typeof usersLikedTweets
>;
