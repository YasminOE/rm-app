"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BoardOptionsProps {
  id: string;
}

//TODO: fix this error
export const BoardOptions = ({ id }: BoardOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="primary" size="lg">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-2 pt-3 pb-3  bg-white/30 backdrop-blur-md  shadow-md rounded-lg animation-smooth"
        side="bottom"
        align="end"
      >
        <div className="text-sm font-bold text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          // onClick={onDelete}
          // disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
