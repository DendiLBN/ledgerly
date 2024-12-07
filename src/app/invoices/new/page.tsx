"use client";

import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { SyntheticEvent, useState } from "react";
import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";

export default function FormSubmit() {
  const [state, setState] = useState("ready");
  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === "pending") return;
    event.preventDefault();
    setState("pending");
  }

  return (
    <View
      as="main"
      className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12"
    >
      <View className="flex justify-between">
        <Text variant="h1" className="text-5xl font-bold">
          Create Invoice
        </Text>
      </View>

      <Form
        action={createAction}
        onSubmit={handleOnSubmit}
        className="grid gap-4 max-w-sm"
      >
        <View>
          <Label htmlFor="name" className="block font-semibold mb-2">
            Billing Name
          </Label>
          <Input id="name" name="name" type="text" />
        </View>
        <View>
          <Label htmlFor="email" className="block font-semibold mb-2">
            Billing Email
          </Label>
          <Input id="email" name="email" type="email" />
        </View>
        <View>
          <Label htmlFor="value" className="block font-semibold mb-2">
            Value
          </Label>
          <Input id="value" name="value" type="number" />
        </View>
        <View>
          <Label htmlFor="description" className="block font-semibold mb-2">
            Description
          </Label>
          <Textarea id="description" name="description" />
        </View>
        <View>
          <SubmitButton />
        </View>
      </Form>
    </View>
  );
}
