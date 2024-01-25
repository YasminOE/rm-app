import { Board } from "@/actions/create-board/types";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "./_components/board-navbar";
import Image from "next/image";

async function getBoard(boardId: string): Promise<Board | null> {
  const res = await fetch(
    "https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const boards: Board[] = await res.json();
  const filteredBoard = boards.find((board) => board.boardId === boardId);

  // console.log({ filteredBoard });
  return filteredBoard || null;
}

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const board = await getBoard(params.boardId);
  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string; id: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await getBoard(params.boardId);

  if (!board) {
    notFound();
  }
  return (
    <div className="relative h-full bg-[#E9EEEA]">
      <BoardNavbar data={board} />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
