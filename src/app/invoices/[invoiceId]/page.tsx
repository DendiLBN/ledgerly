import { eq, and } from "drizzle-orm";
import { Customers, Invoices } from "@/db/schema";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Invoice from "@/app/invoices/[invoiceId]/Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const resolvedParams = await params;

  const invoiceId = parseInt(resolvedParams.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invoice ID must be a number");
  }

  const { userId } = await auth();

  if (!userId) return;

  const [results] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(and(eq(Invoices.userId, userId), eq(Invoices.id, invoiceId)))
    .limit(1);

  if (!results) {
    notFound();
  }

  const invoice = {
    ...results.invoices,
    customer: results.customers,
  };

  return <Invoice Invoice={invoice} />;
}
