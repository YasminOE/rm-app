"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";

//TODO fix error when board deleted
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  console.log({ boardId, id, userId });

  //   if(userId !== boardId) {
  //     return {
  //       error: "Forbidden",
  //     }
  // }
  const currOrgId = orgId;
  let board;

  try {
    const response = await fetch(
      `https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board/${id}`,
      {
        method: "DELETE",
      }
    );

    board = await response.json();
    if (board.ok) {
      revalidatePath(`/organization/${orgId}`);
      redirect(`/organization/${orgId}`);
    }
    console.log("delete board");
  } catch (error) {
    revalidatePath(`/organization/${orgId}`);
    return {
      error: "Failed to delete.",
    };
  }
  // redirect(`/organization/${orgId}`);
  return { data: board };
};

export const deleteBoard = createSafeActions(DeleteBoard, handler);
