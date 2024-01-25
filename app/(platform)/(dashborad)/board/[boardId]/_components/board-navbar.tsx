import { Board } from "@/actions/create-board/types";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import Image from "next/image";

interface BoardNavbarProps {
  data: Board;
}
export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-[120px]  z-[40] bg-white/30 backdrop-blur-lg rounded-lg fixed bottom-2 flex items-center justify-center px-6 gap-x-4 text-black fully-rounded">
      <Image
        src={data.imageThumbUrl}
        alt="background image"
        width={80}
        height={80}
        // fill
        className="relative rounded-full p-3 bg-cover hidden lg:block"
      />
      {/* </div> */}
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id!} />
      </div>
    </div>
  );
};
