/* eslint-disable no-unused-vars */
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await deleteSession();

    revalidatePath("/")
  redirect("/", RedirectType.push);
}