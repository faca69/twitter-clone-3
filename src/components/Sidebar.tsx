"use client";

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserModel } from "../db/schemas/user.schema";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Sparkles, User } from "lucide-react";

export default function Sidebar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    if (!session?.user?.username) {
      setUser(undefined);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${session.user.username}`
    )
      .then((res) => res.json())
      .then((resUser) => setUser(resUser));
  }, [session]);

  return (
    <ol className="flex flex-col gap-3 py-2 h-full">
      {session && user ? (
        <>
          <li>
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="size-10 mb-5" />
            </Link>
          </li>
          <li>
            <Link href="/explore" className="flex items-center gap-2">
              <MagnifyingGlassIcon className="size-10" />
              Explore
            </Link>
          </li>
          <li>
            <Link href="/messages" className="flex items-center gap-2">
              <EnvelopeIcon className="size-10" />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href={`/${session.user.username}`}
              className="flex items-center gap-2"
            >
              <User className="size-10" />
              Profile
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ArrowLeftEndOnRectangleIcon className="size-10" />

            <Button
              className="flex items-center gap-2 bg-transparent text-white p-0 hover:bg-transparent "
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </li>
          <li>
            <Link
              href={"/feed/compose"}
              className="w-full bg-blue-500 p-4 rounded-full text-center font-bold cursor-pointer block"
            >
              Post
            </Link>
          </li>
          <li className="mt-auto">
            <Link
              href={`/${session.user.username}`}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-solid border-blue-500 border-2  shadow-md">
                <Image
                  alt="avatar"
                  src={
                    user.avatar ??
                    "https://as2.ftcdn.net/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp"
                  }
                  width={50}
                  height={50}
                />
              </div>
              <div className="w-10">
                <h1 className="font-bold">{user.name}</h1>
                <p className="text-md text-slate-500">@{user.username}</p>
              </div>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="flex items-center gap-2">
            <Link href="/login" className="flex items-center gap-2">
              <ArrowRightEndOnRectangleIcon className="size-10" />
              Login
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link href="/register" className="flex items-center gap-2">
              <UserPlusIcon className="size-10" />
              Register
            </Link>
          </li>
        </>
      )}
    </ol>
  );
}
