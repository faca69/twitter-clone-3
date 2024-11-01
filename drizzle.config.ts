import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./src/db/schemas/tweet.schema.ts",
    "./src/db/schemas/user.schema.ts",
    "./src/db/schemas/users_follows.schema.ts",
  ],
  out: "",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "twitter_clone_3",
    port: 5432,
  },
  verbose: true,
});
