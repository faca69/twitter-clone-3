import editUserAction from "@/app/actions/edit-user.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserByUsername } from "@/services/users.service";

type EditProfileProps = {
  params: { username: string };
};

export default async function EditProfile({
  params: { username },
}: EditProfileProps) {
  const user = await getUserByUsername(username);

  if (!user) {
    return <h1>User not found</h1>;
  }
  return (
    <form
      className="flex flex-col gap-4 items-center p-4"
      action={editUserAction}
    >
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <input type="hidden" name="id" value={user.id} />

      <div className="w-full">
        <Label htmlFor="name">Name</Label>

        <Input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          defaultValue={user.name}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="username">Username</Label>

        <Input
          type="text"
          name="username"
          id="username"
          placeholder="@johndoe"
          defaultValue={user.username}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="location">Location</Label>

        <Input
          type="text"
          name="location"
          id="location"
          placeholder="Skopje, Macedonia"
          defaultValue={user.location ?? ""}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="url">Url</Label>

        <Input
          type="url"
          name="url"
          id="url"
          placeholder="http://example.com"
          defaultValue={user.url ?? ""}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="avatar">Avatar</Label>

        <Input
          type="url"
          name="avatar"
          id="avatar"
          placeholder="https://github.com/shadcn.png"
          defaultValue={user.avatar ?? ""}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="description">Description</Label>

        <Textarea
          name="description"
          id="description"
          placeholder="developer"
          defaultValue={user.description ?? ""}
        />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
