import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginUser from "../actions/login-user.action";
import LoginForm from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
