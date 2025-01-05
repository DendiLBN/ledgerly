"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/common/text";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full font-semibold">
      <Text className={pending ? "text-transparent" : ""}>
        {pending ? "Submitting..." : "Submit"}
      </Text>
    </Button>
  );
};
