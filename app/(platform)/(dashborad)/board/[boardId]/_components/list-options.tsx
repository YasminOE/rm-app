"use client";

import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { List } from "@prisma/client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { ElementRef, useRef } from "react";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
// import { copyList } from "@/actions/copy-list ";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

//TODO: style
export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`Status "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // const { execute: executeCopy } = useAction(copyList, {
  //   onSuccess: (data) => {
  //     toast.success(`Status "${data.title}" copied`);
  //     closeRef.current?.click();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  // const onCopy = (formData: FormData) => {
  //   const id = formData.get("id") as string;
  //   const boardId = formData.get("boardId") as string;

  //   executeCopy({ id, boardId });
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 bg-[#EDFF8C]" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-2 pt-3 pb-3
        bg-white/30 backdrop-blur-md rounded-lg animation-smooth"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-bold text-center text-neutral-600 pb-4">
          Actions options
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add Request
        </Button>
        {/* <form> */}
        {/* <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy Status
          </FormSubmit>
        </form> */}
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete Status
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
