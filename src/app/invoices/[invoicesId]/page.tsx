import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";
import { eq, and } from "drizzle-orm";
import { Invoices } from "@/db/schema";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common/container";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction } from "@/app/actions";

export default async function InvoicePage({
  params,
}: {
  params: { invoicesId: string };
}) {
  const resolvedParams = await params;

  const invoiceId = parseInt(resolvedParams.invoicesId);

  if (isNaN(invoiceId)) {
    throw new Error("Invoice ID must be a number");
  }

  const { userId } = await auth();

  if (!userId) return;

  const result = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.userId, userId), eq(Invoices.id, invoiceId)))
    .limit(1);

  if (!result || result.length === 0) {
    notFound();
  }

  const invoice = result[0];

  return (
    <Container>
      <View as="main" className="w-full h-full max-w-5xl mx-auto my-12">
        <View className="flex flex-col gap-6">
          <View className="flex gap-4 items-center justify-between">
            <View className="flex gap-4 items-center justify-between">
              <Text variant="h1" className="text-3xl font-semibold">
                Invoice {invoiceId}
              </Text>
              <View className="flex gap-4">
                <Badge
                  className={cn(
                    "rounded-full capitalize text-sm px-3 py-1",
                    invoice.status === "open" && "bg-blue-100 text-blue-800",
                    invoice.status === "paid" && "bg-green-100 text-green-800",
                    invoice.status === "void" &&
                      "bg-yellow-100 text-yellow-800",
                    invoice.status === "uncollectible" &&
                      "bg-yellow-100 text-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </View>
            </View>{" "}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 w-fit px-4 py-2 rounded-md">
                  Change Status
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => (
                  <DropdownMenuItem key={status.id}>
                    <form action={updateStatusAction}>
                      <input type="hidden" name="id" value={invoiceId} />
                      <input type="hidden" name="status" value={status.id} />
                      <button type="submit" className="w-full text-left">
                        {status.label}
                      </button>
                    </form>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </View>

          <View className="flex flex-col gap-2">
            <Text variant="h1" className="text-2xl font-semibold text-gray-700">
              ${invoice.value.toFixed(2)}
            </Text>
            <Text className="text-lg text-gray-600">{invoice.description}</Text>
          </View>

          <View className="mt-8">
            <Text
              variant="h2"
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Billing Details
            </Text>
            <View className="grid gap-2 text-left">
              <Text className="text-gray-700">
                <span className="font-semibold">Invoice ID:</span> {invoice.id}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Invoice Date:</span>{" "}
                {new Date(invoice.createTs).toLocaleDateString()}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Billing Name:</span>{" "}
                {invoice.name}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Billing Email:</span>{" "}
                {invoice.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}
