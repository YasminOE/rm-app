import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { List } from "@prisma/client";

// TODO: delete this later
// export type Board = {
//   title: string;
//   boardId?: string;
//   id?: string;
//   orgId?: string;
//   // imageId?: string;
//   // imageThumbUrl?: string;
//   // imageFullUrl?: string;
//   // imageUserName?: string;
//   // imageLinkHTML?: string;

//   updatedAt?: Date;
// };

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
