import { View } from "@/components/common/view";
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
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Text } from "@/components/common/text";

export default function DashBoard() {
  return (
    <View
      as="main"
      className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12"
    >
      <View className="flex justify-between">
        <Text className="text-5xl font-bold">Dashboard</Text>
        <Text>
          <Button className="inline-flex" variant="ghost">
            <CirclePlus className="h-4 w-4" />
            <Link href="/invoices/new">Create Invoice</Link>
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
          <TableRow>
            <TableCell className="font-medium">
              <View className="font-semibold">10/31/2024</View>
            </TableCell>
            <TableCell className="text-left">
              <View className="font-semibold">Stefan Makler</View>
            </TableCell>
            <TableCell className="text-left p-4">
              <View>Stefan.makler@gmail.com</View>
            </TableCell>
            <TableCell className="text-center  p-4">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="text-right">
              <View className="font-semibold  p-4">$250</View>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  );
}
