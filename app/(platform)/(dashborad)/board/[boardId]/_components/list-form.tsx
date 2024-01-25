"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    // console.log("on submit data:", { title, boardId });
    // console.log("params are", { params });
    // console.log("boardId is", params.boardId);
    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-4 bg-white/30 backdrop-blur-md border-black space-y-4 shadow-md rounded-lg animation-smooth "
        >
          <div className="flex items-center justify-end">
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              className=""
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p>New Status:</p>
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            placeholder="Enter status..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition animation-smooth"
          />
          <input hidden value={params.boardId} name="boardId" id="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Status</FormSubmit>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full fully-rounded bg-[#B8AEE8] hover:bg-[#cac0ff] transition h p-3 flex items-center font-medium text-sm animation-smooth "
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Status
      </button>
    </ListWrapper>
  );
};
