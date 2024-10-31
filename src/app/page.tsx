import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  redirect("/feed/for-you");
  return <h1>home</h1>;
}
