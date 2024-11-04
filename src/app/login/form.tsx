"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form className="flex flex-col gap-4 items-center p-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          placeholder="@username"
          type="text"
          name="username"
          className="w-72"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input
          placeholder="password"
          type="password"
          name="password"
          className="w-72"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button
          type="button"
          disabled={!username || !password}
          onClick={async () => {
            const response = await signIn("credentials", {
              username,
              password,
            });
            console.log(response);
          }}
          className="bg-zinc-900 rounded-md px-4 py-2 text-white w-24 hover:bg-white/40"
        >
          Login
        </Button>
      </form>
    </>
  );
}
