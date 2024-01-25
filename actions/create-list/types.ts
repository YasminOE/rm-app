import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { List } from "@prisma/client";

import { CreateList } from "./schema";

export type Board = {
  title: string;
  boardId: string;
  id?: string;
  orgId?: string;

  updatedAt?: Date;
};

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
