"use server";

import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Customers } from "@/db/schema";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
//   apiVersion: "2023-10-16",
// });

export async function createAction(formData: FormData) {
  const { userId, orgId } = await auth();
  const value = formData.get("value") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  console.log(id, "invoiceId");

  try {
    const [customer] = await db
      .insert(Customers)
      .values({
        createTs: new Date(),
        name: name,
        email: email,
        userId,
        organizationId: orgId || null,
      })
      .returning({
        id: Customers.id,
      });

    const invoice = await db
      .insert(Invoices)
      .values({
        createTs: new Date(),
        value: parseInt(value),
        description,
        userId,
        customerId: customer.id,
        status: "open",
        organizationId: orgId || null,
      })
      .returning({
        id: Invoices.id,
      });

    if (invoice && invoice[0]) {
      redirect(`/invoices/${invoice[0].id}`);
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

  try {
    const results = await db
      .update(Invoices)
      .set({ status })
      .where(and(eq(Invoices.userId, userId), eq(Invoices.id, parseInt(id))));

    revalidatePath(`/invoices/${id}`, "page");
    console.log(results);
  } catch (error) {
    console.error("Error updating invoice status:", error);
    throw error;
  }
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const id = formData.get("id") as string;

  try {
    const resultInvoice = await db
      .delete(Invoices)
      .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

    if (!resultInvoice) {
      throw new Error("Failed to delete invoice.");
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
}

export async function createPayment(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if (isNaN(id)) {
    throw new Error("Invalid Invoice ID");
  }

  try {
    const [result] = await db
      .select({
        status: Invoices.status,
        value: Invoices.value,
      })
      .from(Invoices)
      .where(eq(Invoices.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Invoice not found");
    }

    console.log(result);
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}
