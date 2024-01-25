import { z } from "zod";
// import { Boards } from "@/app/(platform)/(dashborad)/organization/[organizationId]/page";

import { ActionState } from "@/lib/create-safe-action";

import { CopyList } from "./schema";
// import { List } from "@prisma/client";
import { ListWithCards } from "@/types";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, ListWithCards>;
