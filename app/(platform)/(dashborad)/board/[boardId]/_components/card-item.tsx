"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
}

//TODO: style
export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={
            () => cardModal.onOpen(data.id)
            // console.log("clicked")
          }
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-[#f1f2f4] rounded-2xl shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
