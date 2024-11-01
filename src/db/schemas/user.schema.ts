import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { follows } from "./users_follows.schema";
import { usersLikedTweets } from "./users_liked_tweets.schema";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 30 }).notNull(),
  username: varchar("username", { length: 20 }).notNull(),
  joinDate: timestamp("join_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
  url: varchar("url"),
  location: varchar("location"),
  description: varchar("description"),
  avatar: varchar("avatar"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  follows: many(follows, { relationName: "follows" }),
  followers: many(follows, { relationName: "followers" }),
  likedTweets: many(usersLikedTweets),
}));

export type UserModel = InferSelectModel<typeof users>;

export type UserCreateModel = InferInsertModel<typeof users>;

export type UserExtendedModel = UserModel & {
  followers: UserModel[];
  following: UserModel[];
};