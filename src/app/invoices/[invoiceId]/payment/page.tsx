import { eq } from "drizzle-orm";
import { Check, CreditCard } from "lucide-react";
import Stripe from "stripe";

import { Container } from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { createPayment, updateStatusAction } from "@/app/actions";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";

interface InvoicePageProps {
  params: { invoiceId: string };
  searchParams: {
    status: string;
    session_id: string;
  };
}

export default async function PaymentPage({
  params,
  searchParams,
}: InvoicePageProps) {
  const resolvedParams = await params;
  const rawInvoiceId = resolvedParams.invoiceId;

  const resolvedSearchParams = await searchParams;
  const rawSessionId = resolvedSearchParams?.session_id;

  if (!rawInvoiceId) {
    throw new Error("Invoice ID is missing in the parameters.");
  }

  const invoiceId = Number.parseInt(rawInvoiceId, 10);

  if (Number.isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const stripe = new Stripe(process.env.STRIPE_API_SECRET as string);

  const sessionId = rawSessionId;
  const isSuccess = sessionId && resolvedSearchParams.status === "success";
  const isCanceled = resolvedSearchParams.status === "canceled";
  let isError = isSuccess && !sessionId;

  if (isSuccess) {
    const { payment_status } = await stripe.checkout.sessions.retrieve(
      sessionId
    );
    if (payment_status !== "paid") {
      isError = true;
    } else {
      const formData = new FormData();
      formData.append("id", String(invoiceId));
      formData.append("status", "paid");
      await updateStatusAction(formData);
    }
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      createTs: Invoices.createTs,
      description: Invoices.description,
      value: Invoices.value,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result,
    customer: {
      name: result.name,
    },
  };

  return (
    <Container>
      <View as="main" className="w-full h-full max-w-5xl mx-auto my-12">
        {isError && (
          <View className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
            Something went wrong, please try again!
          </View>
        )}
        {isCanceled && (
          <View className="bg-yellow-100 text-sm text-yellow-800 text-center px-3 py-2 rounded-lg mb-6">
            Payment was canceled, please try again.
          </View>
        )}
        <View className="flex flex-col gap-4 ">
          <View className="flex gap-4 items-center justify-between">
            <View className="flex gap-4 items-center">
              <Text variant="h1" className="text-3xl font-semibold">
                Invoice {invoice.id}
              </Text>
              <Badge
                className={cn(
                  "rounded-full capitalize text-sm px-3 py-1",
                  invoice.status === "open" && "bg-blue-100 text-blue-800",
                  invoice.status === "paid" && "bg-green-100 text-green-800",
                  invoice.status === "void" && "bg-zinc-100 text-zinc-800",
                  invoice.status === "uncollectible" &&
                    "bg-red-100 text-red-600"
                )}
              >
                {invoice.status}
              </Badge>
            </View>
            <View>
              {invoice.status === "open" && (
                <form action={createPayment}>
                  <input type="hidden" name="id" value={invoice.id} />
                  <Button className="flex gap-2 font-bold bg-green-700">
                    <CreditCard className="w-5 h-auto" />
                    Pay Invoice
                  </Button>
                </form>
              )}
              {invoice.status === "paid" && (
                <View className="flex gap-2 items-center text-xl font-bold">
                  <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
                  Invoice Paid
                </View>
              )}
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text variant="h1" className="text-2xl mb-4 font-semibold">
              {invoice.value * 1} PLN
            </Text>
            <Text className="text-lg font-semibold flex mt-3">
              {invoice.description}
            </Text>
          </View>

          <View className="mt-8">
            <Text
              variant="h2"
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Billing Details
            </Text>
            <View className="grid gap-2 text-left">
              <Text className="text-gray-700 ">
                <span className="font-semibold mr-2">Invoice ID:</span>
                {invoice.id}
              </Text>
              <Text className="text-gray-700 ">
                <span className="font-semibold mr-2">Invoice Date:</span>
                {new Date(invoice.createTs).toLocaleDateString()}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold mr-2">Billing Name:</span>
                {invoice.customer.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}
