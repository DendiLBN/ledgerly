"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
import Container from "@/components/common/container";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/common/text";
import { View } from "@/components/common/view";
import { createAction } from "@/app/actions";

export default function NewInvoice() {
  // const [error, setError] = useState<string>();
  // const router = useRouter();

  // const handleSubmit = async (formData: FormData) => {
  //   console.log("formData", formData);
  //   try {
  //     await createAction(formData);
  //     router.push("/dashboard");
  //   } catch (error) {
  //     setError(
  //       (error as string) || "Failed to create invoice. Please try again."
  //     );
  //   }
  // };

  return (
    <View as="main" className="h-full">
      <Container>
        {/* {error && (
          <Text className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
            {error}
          </Text>
        )} */}
        <View className="flex justify-between mb-6 mt-12">
          <Text className="text-3xl font-semibold">Create Invoice</Text>
        </View>

        <form action={createAction} className="grid gap-4 max-w-xs">
          <View>
            <Label htmlFor="name" className="block font-semibold text-sm mb-2">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" />
          </View>
          <View>
            <Label htmlFor="email" className="block font-semibold text-sm mb-2">
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" />
          </View>
          <View>
            <Label htmlFor="value" className="block font-semibold text-sm mb-2">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </View>
          <View>
            <Label
              htmlFor="description"
              className="block font-semibold text-sm mb-2"
            >
              Description
            </Label>
            <Textarea id="description" name="description" />
          </View>
          <View>
            <SubmitButton />
          </View>
        </form>
      </Container>
    </View>
  );
}
