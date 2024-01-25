import { Board } from "@/actions/create-board/types";

export type Card = {
  id: string;
  title: string;
  order: number;
  description?: string;
  listId: string;
  list: List[];
  createdAt: Date;
};

export type List = {
  id: string;
  title: string;
  order: number;
  boardId: string;
  board: Board;
  cards: Card[];
};
