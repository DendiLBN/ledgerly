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

  if (!process.env.STRIPE_API_SECRET) {
    throw new Error("STRIPE_API_SECRET is not set in environment variables");
  }

  const stripe = new Stripe(process.env.STRIPE_API_SECRET);

  const sessionId = rawSessionId || "";
  const isSuccess = sessionId && resolvedSearchParams.status === "success";
  const isCanceled = resolvedSearchParams.status === "canceled";
  let isError = isSuccess && !sessionId;

  if (isSuccess) {
    console.log("Success status: ", resolvedSearchParams.status);
    const { payment_status } = await stripe.checkout.sessions.retrieve(
      sessionId
    );
    if (payment_status !== "paid") {
      isError = true;
      console.log("Payment status is not 'paid'.");
    } else {
      const formData = new FormData();
      formData.append("id", String(invoiceId));
      formData.append("status", "paid");
      await updateStatusAction(formData);
      console.log("Invoice paid and status updated.");
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
    <View as="main" className="w-full h-full">
      <Container>
        {isError && (
          <div className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
            Something went wrong, please try again!
          </div>
        )}
        {isCanceled && (
          <div className="bg-yellow-100 text-sm text-yellow-800 text-center px-3 py-2 rounded-lg mb-6">
            Payment was canceled, please try again.
          </div>
        )}
        <View className="grid grid-cols-2">
          <View>
            <View className="flex justify-between mb-8">
              <View className="flex items-center gap-4 text-3xl font-semibold">
                Invoice {invoice.id}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "paid" && "bg-green-600",
                    invoice.status === "void" && "bg-zinc-700",
                    invoice.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </View>
            </View>

            <Text className="text-3xl mb-3">
              ${(invoice.value / 100).toFixed(2)}
            </Text>

            <Text className="text-lg mb-8">{invoice.description}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold mb-4">Manage Invoice</Text>
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

        <Text className="font-bold text-lg mb-4">Billing Details</Text>

        <View className="grid gap-2">
          <View className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </View>
          <View className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </View>
          <View className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </View>
        </View>
      </Container>
    </View>
  );
}
