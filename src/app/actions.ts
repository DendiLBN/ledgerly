"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  const { userId } = await auth();
  const value = formData.get("value") as string;
  const description = formData.get("description") as string;

  if (!userId) {
    return;
  }

  console.log("formData", formData);
  await db
    .insert(Invoices)
    .values({
      createTs: new Date(),
      value: Number(value),
      description: description,
      status: "open",
      userId,
    })
    .returning({
      id: Invoices.id,
    });
  redirect("/invoices/${results[0].id}");
}
