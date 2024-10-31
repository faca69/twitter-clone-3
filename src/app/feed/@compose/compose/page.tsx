"use client";
import ComposeTweet from "@/components/ComposeTweet";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose a tweet</DialogTitle>
          <ComposeTweet onSubmit={() => router.back()} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
