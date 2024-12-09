import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";

import { eq } from "drizzle-orm";

import { Invoices } from "@/db/schema";

import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: { invoicesId: string };
}) {
  const invoiceId = parseInt(params.invoicesId);

  if (isNaN(invoiceId)) {
    throw new Error("Invoice ID must be a number");
  }

  const result = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  console.log(result);

  return (
    <View
      as="main"
      className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12"
    >
      <View className=" flex justify-between">
        <Text variant="h1" className="text-3xl font-semibold">
          Inovoice {invoiceId}
        </Text>
        <Text></Text>
      </View>
    </View>
  );
}
