"use server";

import { revalidatePath } from "next/cache";
import { createMessage } from "../../services/messages.service";

export async function sendMessage(formData: FormData) {
  const message = {
    userA: formData.get("userA") as string,
    userB: formData.get("userB") as string,
    text: formData.get("text") as string,
  };

  const createdMessage = await createMessage(message);

  revalidatePath("/messages/" + createdMessage.conversationId, "page");
}
