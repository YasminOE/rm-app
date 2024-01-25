import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { User2, PenBoxIcon, LucidePanelsRightBottom } from "lucide-react";

import { Board } from "@/actions/create-board/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormPopover } from "@/components/form/form-popover";

//TODO: replace every bg-sky-700 or ky color with brand color
async function getData(orgId: string) {
  const res = await fetch(
    "https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // const data: Board[] = await res.json();
  // return data;

  const allBoards: Board[] = await res.json();
  const filteredBoards = allBoards.filter((board) => board.orgId === orgId);

  return filteredBoards;
}

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }
  const boards = await getData(orgId);

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.boardId}
            href={`/board/${board.boardId}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-[#CFE1CA] rounded-lg h-full p-2 overflow-hidden animation-smooth "
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-[#CFE1CA]/30 group-hover:bg-black/40 transition  animation-smooth" />
            <p className="relative font-semibold text-black text-lg">
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full border-[1.4px] border-black rounded-lg flex flex-col gap-y-1 items-center justify-center hover:bg-[#B8AEE8]/75 transition animation-smooth "
          >
            <LucidePanelsRightBottom className="h-5 w-5" />
            <p className="text-sm">Create new board</p>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BorderListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
