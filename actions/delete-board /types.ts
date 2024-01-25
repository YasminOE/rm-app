import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";

export type Board = {
  title: string;
  boardId?: string;
  id?: string;
  orgId?: string;
  // imageId?: string;
  // imageThumbUrl?: string;
  // imageFullUrl?: string;
  // imageUserName?: string;
  // imageLinkHTML?: string;

  updatedAt?: Date;
};

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;
