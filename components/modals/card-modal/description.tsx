"use client";

import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithLists } from "@/types";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
  data: CardWithLists;
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Request "${data.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-1`">Description:</p>
        {isEditing ? (
          <form action={onSubmit} className="space-y-2" ref={formRef}>
            <FormTextarea
              ref={textareaRef}
              id="description"
              className="w-full mt-2"
              placeholder="Add more detailed description"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save changes</FormSubmit>

              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel changes
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="min-h-[78px] w-full bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-lg"
            role="button"
            onClick={enableEditing}
          >
            {data.description || "Add more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6" />
      <div className="w-full">
        <Skeleton className="h-[76px] w-full" />
      </div>
    </div>
  );
};
