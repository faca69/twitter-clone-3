import { ConversationExtendedModel } from "../db/schemas/conversations.schema";

import {
  createConversation,
  findManyByUserId,
  createMessage as createMessageInDB,
  findConversationById,
  findConversationBetweenUsers,
} from "../repositories/messages.repository";

export async function getConversations(userId: string) {
  const conversations = await findManyByUserId(userId);

  return conversations as ConversationExtendedModel[];
}

export async function getConversationById(id: string) {
  const conversation = await findConversationById(id);

  return conversation as ConversationExtendedModel;
}

export async function createMessage({
  userA,
  userB,
  text,
}: {
  userA: string;
  userB: string;
  text: string;
}) {
  const conversation = await findConversationBetweenUsers(userA, userB);

  if (conversation) {
    return createMessageInDB({
      text,
      authorId: userA,
      conversationId: conversation.id,
    });
  }

  const newConversation = await createConversation({
    userA,
    userB,
  });

  return createMessageInDB({
    text,
    authorId: userA,
    conversationId: newConversation.id,
  });
}
