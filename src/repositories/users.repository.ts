import { db } from "@/db";
import { UserCreateModel, UserModel, users } from "@/db/schemas/user.schema";
import { eq } from "drizzle-orm";

export const findByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
};

export const create = (user: UserCreateModel): Promise<UserModel> => {
  return db
    .insert(users)
    .values(user)
    .returning()
    .then((res) => res?.[0]);
};
