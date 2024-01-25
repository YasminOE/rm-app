"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { CreateList } from "./schema";
import { Board, InputType, ReturnType } from "./types";
import { db } from "@/lib/db";

async function getData() {
  const res = await fetch(
    "https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const board: Board = await res.json();
  // console.log("board fetched is:", { board });

  return board;
}

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let list;

  const board = await getData();

  const { title, boardId } = data;

  if (!board) {
    return {
      error: "Board not found",
    };
  }

  const lastList = await db.list.findFirst({
    where: { boardId: board.boardId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newList = lastList ? lastList.order + 1 : 1;
  // boardId = board.boardId;
  // let title = board.title;
  // let boardId = board.boardId;

  try {
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newList,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.boardId}`);
  return { data: list };
};

export const createList = createSafeActions(CreateList, handler);
