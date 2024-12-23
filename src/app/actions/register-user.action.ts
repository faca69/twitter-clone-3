"use server";

import { UserCreateModel } from "@/db/schemas/user.schema";
import { createUser } from "@/services/users.service";
import { redirect } from "next/navigation";

export default async function registerUser(formData: FormData) {
  const newUser: UserCreateModel = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  await createUser(newUser);

  redirect("/login");
}
