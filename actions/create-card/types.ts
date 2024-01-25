import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { Card } from "@prisma/client";

import { CreateCard } from "./schema";

//TODO: delete if it didn't effect code
// export type Board = {
//   title: string;
//   boardId: string;
//   id?: string;
//   orgId?: string;

//   updatedAt?: Date;
// };

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
