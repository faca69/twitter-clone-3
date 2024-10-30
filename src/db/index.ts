import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tweets } from "./schemas/tweet.schema";

const client = postgres({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "twitter_clone_3",
  port: 5432,
});

export const db = drizzle(client, {
  schema: { tweets },
  logger: true,
});

export type Db = typeof db;
