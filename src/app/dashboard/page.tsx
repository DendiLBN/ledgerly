import { View } from "@/components/common/view";
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
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Text } from "@/components/common/text";
import { Customers, Invoices } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";

export default async function DashBoard() {
  const { userId, orgId } = await auth();
  if (!userId) return;

  let results;

  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId)));
  }

  const invoices = results?.map(({ invoices, customers }) => ({
    ...invoices,
    customer: customers,
  }));

  return (
    <View
      as="main"
      className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12"
    >
      <View className="flex justify-between items-center">
        <Text className="text-5xl font-bold text-gray-800">Dashboard</Text>
        <Button className="inline-flex items-center gap-2">
          <CirclePlus className="h-4 w-4" />
          <Link href="/invoices/new">Create Invoice</Link>
        </Button>
      </View>
      <Table className="mt-6">
        <TableCaption className="text-gray-500">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4 text-left">Date</TableHead>
            <TableHead className="p-4 text-left">Customer</TableHead>
            <TableHead className="p-4 text-left">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="text-left p-4">
                <Text className="font-semibold">
                  {new Date(result.createTs).toLocaleDateString()}
                </Text>
              </TableCell>
              <TableCell className="p-4 text-left">
                <Text className="font-semibold">{result.customer.name}</Text>
              </TableCell>
              <TableCell className="p-4 text-left">
                <Text className="font-semibold">{result.customer.email}</Text>
              </TableCell>
              <TableCell className="text-center p-4">
                <button className="p-2">{result.status}</button>
              </TableCell>
              <TableCell className="text-right p-4">
                <Text className="font-semibold">${result.value}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
}
