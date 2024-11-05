import { formatDate } from "@/lib/format-date";
import { getUserByUsername } from "@/services/users.service";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProfileProps = {
  params: Promise<{ username: string }>;
};

export default async function Profile({ params }: ProfileProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-solid border-zinc-600 border-2 shadow-md">
            <Image
              alt="avatar"
              src={user.avatar || "https://github.com/shadcn.png"}
              width={100}
              height={100}
            />
          </div>

          <Link
            className="border-solid border-2 border-white text-sm font-bold shadow-md px-4 py-2 text-white h-10 rounded-full"
            href={`/${username}/edit`}
          >
            Edit Profile
          </Link>
        </div>
        <h1 className="font-bold text-2xl mt-2">{user.name}</h1>
        <h2 className="text-zinc-500">@{user.username}</h2>
        {user.description && <p className="mt-2">{user.description}</p>}
        <div className="flex justify-between mt-2 gap-2">
          {user.location && (
            <p className="flex items-center gap-1 text-zinc-400 hover:underline">
              <MapPin /> {user.location}
            </p>
          )}
          {user.url && (
            <p className="flex items-center gap-1 text-zinc-400 hover:underline">
              <LinkIcon />

              <a href={user.url} target="_blank">
                {user.url}
              </a>
            </p>
          )}
        </div>
        <div>
          {user.joinDate && (
            <p className="flex items-center gap-1 text-zinc-400 mt-2">
              <Calendar className="size-5" />
              Joined {user.joinDate.toDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
