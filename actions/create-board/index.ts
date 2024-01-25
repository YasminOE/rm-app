"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { createSafeActions } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board",
    };
  }

  let board;

  try {
    const response = await fetch(
      "https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board",
      {
        method: "POST",
        body: JSON.stringify({
          title: title,
          orgId: orgId,
          imageId: imageId,
          imageThumbUrl: imageThumbUrl,
          imageFullUrl: imageFullUrl,
          imageUserName: imageUserName,
          imageLinkHTML: imageLinkHTML,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    board = await response.json(); // Assuming the API returns JSON
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeActions(CreateBoard, handler);

// import { redirect } from "next/navigation";
// import { z } from "zod";
// export type State = {
//   errors?: {
//     title?: string[];
//   };
//   message?: string | null;
// };

// const CreateBoard = z.object({
//   title: z.string().min(3, {
//     message: "Minimum length of 3 letters is required",
//   }),
// });

// export async function createBoard(prevState: State, formData: FormData) {
//   const validatedFields = CreateBoard.safeParse({
//     title: formData.get("title"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing fields",
//     };
//   }

//   const { title } = validatedFields.data;
//   try {
//     const response = await fetch(
//       "https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board",
//       {
//         method: "POST",
//         body: JSON.stringify({ title: title }),
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );
//     const result = await response.json();
//     console.log({ result });
//     // redirect("/organization/org_2bHeBsPwA4C33UcwoszWReCzyYT");
//     revalidatePath("/organization/org_2bHeBsPwA4C33UcwoszWReCzyYT");
//     return result;
//   } catch (error) {
//     return {
//       message: "Database Error",
//     };
//   }
// }
