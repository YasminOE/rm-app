"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";

// TODO delete the mockapi fetch if not needed
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
    // const response = await fetch(
    //   `https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board/${id}`,
    //   {
    //     method: "DELETE",
    //   }
    // );

    // board = filteredBoard;
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeActions(DeleteList, handler);
