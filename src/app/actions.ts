"use server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAction(formData: FormData) {
  console.log("formData", formData);
  const { userId } = await auth();
  const value = formData.get("value") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const description = formData.get("description") as string;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const results = await db
      .insert(Invoices)
      .values({
        createTs: new Date(),
        value: Number(value),
        description: description,
        status: "open",
        name: name,
        email: email,
        userId,
      })
      .returning({
        id: Invoices.id,
      });

    if (results && results.length > 0) {
      redirect(`/invoices/${results[0].id}`);
    } else {
      throw new Error("Failed to create invoice.");
    }
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.userId, userId), eq(Invoices.id, parseInt(id))));

  revalidatePath("/invoices/${id}", "page");
  console.log(results);
}
