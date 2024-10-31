"use client";

import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

enum TabsValue {
  ForYou = "for-you",
  Following = "following",
}

type FeedLayoutProps = {
  children: ReactNode;
  compose: ReactNode;
};

export default function FeedLayout({ children, compose }: FeedLayoutProps) {
  const [selectedTab, setSelectedTab] = useState(TabsValue.ForYou);

  const router = useRouter();

  return (
    <Tabs
      defaultValue={TabsValue.ForYou}
      onValueChange={(value) => {
        setSelectedTab(value as TabsValue);
        router.push(`/feed/${value}`);
      }}
    >
      <TabsList className="border-b border-zinc-800">
        <TabsTrigger
          value={TabsValue.ForYou}
          className={cn(
            "py-3 px-5",
            selectedTab === TabsValue.ForYou &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.ForYou && "text-gray-100"
          )}
        >
          For You
        </TabsTrigger>
        <TabsTrigger
          value={TabsValue.Following}
          className={cn(
            "py-3 px-5",
            selectedTab === TabsValue.Following &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.Following && "text-gray-100"
          )}
        >
          Following
        </TabsTrigger>

        <TabsContent value={TabsValue.ForYou}>{children}</TabsContent>
        <TabsContent value={TabsValue.Following}>{children}</TabsContent>
      </TabsList>

      {compose}
    </Tabs>
  );
}
