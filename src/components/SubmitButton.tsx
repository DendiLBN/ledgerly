"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/common/text";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log("pending", pending);
  return (
    <Button className="w-full font-semibold">
      <Text className={'pending && "text-transparent'}>Submit </Text>
    </Button>
  );
};

export default SubmitButton;
