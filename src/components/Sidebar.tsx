import { MessageCircle, Search, User } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <ol className="flex flex-col gap-3 py-2 h-full ">
      <li>
        <Link href={"/"} className="flex items-center gap-2 text-4xl mb-5">
          F
        </Link>
      </li>

      <li>
        <Link href={"/explore"} className="flex items-center gap-2">
          <Search />
          Explore
        </Link>
      </li>
      <li>
        <Link href={"/messages"} className="flex items-center gap-2">
          <MessageCircle />
          Messages
        </Link>
      </li>

      <li>
        <Link href={"/profile"} className="flex items-center gap-2">
          <User />
          Profile
        </Link>
      </li>

      <li>Post</li>
    </ol>
  );
}
