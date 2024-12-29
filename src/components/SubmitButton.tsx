"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/common/text";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button className="w-full font-semibold" disabled={isSubmitting}>
      <Text className={isSubmitting ? "text-transparent" : ""}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Text>
    </Button>
  );
};
