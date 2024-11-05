"use client";
import { UserExtendedModel, UserModel } from "@/db/schemas/user.schema";
import {
  LogInIcon,
  LucideLogOut,
  LucidePlug2,
  MessageCircle,
  Search,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    if (!session?.user.username) {
      setUser(undefined);
      return;
    }

    fetch(`http://localhost:3000/api/users/${session.user.username}`)
      .then((res) => res.json())
      .then((resUser) => setUser(resUser));
  }, [session]);

  return (
    <ol className="flex flex-col gap-3 py-2 h-full ">
      {session && user ? (
        <>
          <li>
            <Link href={"/"} className="flex items-center gap-2 text-4xl mb-5">
              F
            </Link>
          </li>

          <li>
            <Link href={"/explore"} className="flex items-center gap-2 size">
              <Search className="size-10" />
              Explore
            </Link>
          </li>
          <li>
            <Link href={"/messages"} className="flex items-center gap-2">
              <MessageCircle className="size-10" />
              Messages
            </Link>
          </li>

          <li>
            <Link href={"/profile"} className="flex items-center gap-2">
              <User className="size-10" />
              Profile
            </Link>
          </li>

          <li>
            <Button onClick={() => signOut()}>
              <LucideLogOut className="size-10" />
              Logout
            </Button>
          </li>

          <li>
            <Link
              className="w-full bg-blue-500 p-4 rounded-full text-center font-bold cursor-pointer block"
              href={"/feed/compose"}
            >
              Post
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href={"/login"} className="flex items-center gap-2">
              <LogInIcon className="size-10" />
              Login
            </Link>
          </li>

          <li>
            <Link href={"/register"} className="flex items-center gap-2">
              <LucidePlug2 className="size-10" />
              Register
            </Link>
          </li>
        </>
      )}
    </ol>
  );
}
