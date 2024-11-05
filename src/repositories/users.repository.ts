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

export const update = async (
  id: string,
  userData: Omit<UserCreateModel, "password">
) => {
  return db
    .update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning()
    .then((res) => res?.[0]);
};
