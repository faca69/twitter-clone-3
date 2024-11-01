import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginUser from "../actions/login-user.action";

export default function Login() {
  return (
    <form className="flex flex-col gap-4 items-center p-4" action={loginUser}>
      <h1 className="text-2xl font-bold">Login</h1>
      <Input
        placeholder="@username"
        type="text"
        name="username"
        className="w-72"
      />
      <Input
        placeholder="password"
        type="password"
        name="password"
        className="w-72"
      />

      <Button
        type="submit"
        className="bg-zinc-900 rounded-md px-4 py-2 text-white w-24 hover:bg-white/40"
      >
        Login
      </Button>
    </form>
  );
}
