"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-auditlog";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  console.log({ boardId, id, userId });

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeActions(DeleteList, handler);
