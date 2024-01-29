import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
