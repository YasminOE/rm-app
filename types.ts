import { Board } from "./actions/create-board/types";

import { Card, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithLists = Card & { list: List };

export type ListWithBoards = List & { board: Board };
