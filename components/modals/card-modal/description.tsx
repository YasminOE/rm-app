"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithLists } from "@/types";
import { AlignLeft } from "lucide-react";

interface DescriptionProps {
  data: CardWithLists;
}

export const Description = ({ data }: DescriptionProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-1`">Description:</p>
        <div
          className="min-h-[78px] w-full bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-lg"
          role="button"
        >
          {data.description || "Add more detailed description..."}
        </div>
      </div>
      {data.description}
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
