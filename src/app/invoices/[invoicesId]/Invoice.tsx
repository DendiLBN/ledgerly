"use client";

import { useOptimistic } from "react";
import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";
import { Customers, Invoices } from "@/db/schema";
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
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { Ellipsis, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvoicePageProps {
  Invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}

export default function Invoice({ Invoice }: InvoicePageProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    Invoice.status,
    (newStatus) => {
      return String(newStatus);
    }
  );

  async function hadleOnUptadeStatus(formData: FormData) {
    await updateStatusAction(formData);
    setCurrentStatus(formData.get("status"));
    try {
      await updateStatusAction(formData);
    } catch (e) {
      String(e);
      setCurrentStatus(Invoice.status);
    }
  }

  return (
    <Container>
      <View as="main" className="w-full h-full max-w-5xl mx-auto my-12">
        <View className="flex flex-col gap-6">
          <View className="flex gap-4 items-center justify-between">
            <View className="flex gap-4 items-center justify-between">
              <Text variant="h1" className="text-3xl font-semibold">
                Invoice {Invoice.id}
              </Text>
              <View className="flex gap-4">
                <Badge
                  className={cn(
                    "rounded-full capitalize text-sm px-3 py-1",
                    currentStatus === "open" && "bg-blue-100 text-blue-800",
                    currentStatus === "paid" && "bg-green-100 text-green-800",
                    currentStatus === "void" && "bg-yellow-100 text-yellow-800",
                    currentStatus === "uncollectible" &&
                      "bg-yellow-100 text-red-600"
                  )}
                >
                  {currentStatus}
                </Badge>
              </View>
            </View>
            <View className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 w-fit px-4 py-2 rounded-md">
                    Change Status
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {AVAILABLE_STATUSES.map((status) => (
                    <DropdownMenuItem key={status.id}>
                      <form action={hadleOnUptadeStatus}>
                        <input type="hidden" name="id" value={Invoice.id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button type="submit" className="w-full text-left">
                          {status.label}
                        </button>
                      </form>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300 w-fit px-4 py-2 rounded-md"
                      type="button"
                      aria-label="More Options"
                    >
                      <Ellipsis className="w-4 h-auto" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="flex items-center gap-2 w-full"
                          type="button"
                        >
                          <Trash2 className="w-4 h-auto" />
                          Delete Invoice
                        </Button>
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex justify-center gap-4 mb-2">
                      Delete Invoice?
                    </DialogTitle>
                    <DialogDescription className="text-center mb-2">
                      This action cannot be undone. This will permanently delete
                      the invoice and remove your data from our server.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-center sm:justify-center">
                    <form action={deleteInvoiceAction}>
                      <input type="hidden" name="id" value={Invoice.id} />
                      <Button variant="destructive" type="submit">
                        Confirm Delete
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text variant="h1" className="text-2xl font-semibold text-gray-700">
              ${Invoice.value.toFixed(2)}
            </Text>
            <Text className="text-lg text-gray-600">{Invoice.description}</Text>
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
                <span className="font-semibold">Invoice ID:</span> {Invoice.id}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Invoice Date:</span>
                {new Date(Invoice.createTs).toLocaleDateString()}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Billing Name:</span>
                {Invoice.customer.name}
              </Text>
              <Text className="text-gray-700">
                <span className="font-semibold">Billing Email:</span>
                {Invoice.customer.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}
