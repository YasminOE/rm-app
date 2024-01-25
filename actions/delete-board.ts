"use server";

import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string): Promise<any> {
  const response = await fetch(
    `https://65ae7ed21dfbae409a74f76c.mockapi.io/api/v1/board/${id}`,
    {
      method: "DELETE",
    }
  );
  const deleted = response.json();
  console.log("Deleted the board", { deleted });
  revalidatePath("/organization/org_2bHeBsPwA4C33UcwoszWReCzyYT");
  // return deleted;
}
