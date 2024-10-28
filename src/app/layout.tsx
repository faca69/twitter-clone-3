import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F",
  description: "Twitter Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-black text-white font-sans antialiased dark",
          inter.className
        )}
      >
        <main className="min-h-screen flex flex-col items-center">
          <article className="flex flex-row max-w-[800px] w-full h-screen">
            <section className="w-80 p-2">
              <Sidebar />
            </section>
            <section className="w-full border-zinc-800 border-l p-0 border-r">
              {children}
            </section>
          </article>
        </main>
      </body>
    </html>
  );
}
