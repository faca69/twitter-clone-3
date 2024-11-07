import {
  ConversationCreateModel,
  conversations,
} from "./../db/schemas/conversations.schema";
import { db } from "../db";
import { and, eq, or } from "drizzle-orm";
import { MessageCreateModel, messages } from "../db/schemas/messages.schema";

export async function findManyByUserId(userId: string) {
  return db.query.conversations.findMany({
    where: or(eq(conversations.userA, userId), eq(conversations.userB, userId)),
    with: {
      messages: {
        limit: 1,
      },
      userA: true,
      userB: true,
    },
  });
}

export async function findConversationById(id: string) {
  return db.query.conversations.findFirst({
    where: eq(conversations.id, id),
    with: {
      messages: {
        with: {
          author: true,
        },
      },
      userA: true,
      userB: true,
    },
  });
}

export async function findConversationBetweenUsers(
  userA: string,
  userB: string
) {
  return db.query.conversations.findFirst({
    where: or(
      and(eq(conversations.userA, userA), eq(conversations.userB, userB)),
      and(eq(conversations.userA, userB), eq(conversations.userB, userA))
    ),
  });
}

export async function createConversation(
  conversation: ConversationCreateModel
) {
  return db
    .insert(conversations)
    .values(conversation)
    .returning()
    .then((res) => res?.[0]);
}

export async function createMessage(message: MessageCreateModel) {
  return db
    .insert(messages)
    .values(message)
    .returning()
    .then((res) => res?.[0]);
}