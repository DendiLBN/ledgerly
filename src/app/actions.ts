"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  const value = formData.get("value") as string;
  const description = formData.get("description") as string;
  console.log(value, description);

  console.log("formData", formData);
  await db
    .insert(Invoices)
    .values({
      createTs: new Date(),
      value: Number(value),
      description: description,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });
  redirect("/invoices/${results[0].id}");
}
