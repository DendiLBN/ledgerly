import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { CirclePlus } from "lucide-react";

import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";

import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";
import { Container } from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function DashBoard() {
  const { userId } = await auth();

  if (!userId) return;

  const results: Array<{
    invoices: typeof Invoices.$inferSelect;
    customers: typeof Customers.$inferSelect;
  }> = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id));

  const invoices = results?.map(({ invoices, customers }) => {
    return {
      ...invoices,
      customer: customers,
    };
  });

  return (
    <View as="main" className="h-full">
      <Container>
        <View className="flex justify-between mb-6">
          <Text className="text-3xl font-semibold">Invoices</Text>
          <Text>
            <Button className="inline-flex gap-2" variant="ghost" asChild>
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </Text>
        </View>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((result) => {
              return (
                <TableRow key={result.id}>
                  <TableCell className="font-medium text-left p-0">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="block p-4 font-semibold"
                    >
                      {new Date(result.createTs).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="block p-4 font-semibold"
                    >
                      {result.customer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                      {result.customer.email}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                      <Badge
                        className={cn(
                          "rounded-full capitalize",
                          result.status === "open" && "bg-blue-500",
                          result.status === "paid" && "bg-green-600",
                          result.status === "void" && "bg-zinc-700",
                          result.status === "uncollectible" && "bg-red-600"
                        )}
                      >
                        {result.status}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="block p-4 font-semibold"
                    >
                      {(result.value * 1).toFixed(2)} PLN
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </View>
  );
}
