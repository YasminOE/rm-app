"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { Board, InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let board;

  try {
    const response = await fetch(
      `https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          updatedAt: new Date(),
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // const boards: Board[] = await response.json();
    // const filteredBoard = boards.find(
    //   (board) => board.orgId === orgId && board.id === id
    // );
    board = await response.json();
    console.log("BOARD UPDATE:", { board });
    // board = filteredBoard;
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${board.boardId}`);
  return { data: board };
};

export const updateBoard = createSafeActions(UpdateBoard, handler);
