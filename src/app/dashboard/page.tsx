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

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <p>
          <Button className="inline-flex" variant="ghost">
            <CirclePlus className="h-4 w-4" />
            <Link href="/invoices/new">Create Invoice</Link>
          </Button>
        </p>
      </div>
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
              <span className="font-semibold">10/31/2024</span>
            </TableCell>
            <TableCell className="text-left">
              <span className="font-semibold">Stefan Makler</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span>Stefan.makler@gmail.com</span>
            </TableCell>
            <TableCell className="text-center  p-4">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="text-right">
              <span className="font-semibold  p-4">$250</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
