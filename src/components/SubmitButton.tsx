"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log("pending", pending);
  return (
    <Button className="w-full font-semibold">
      <span className={'pending && "text-transparent'}>Submit </span>
    </Button>
  );
};

export default SubmitButton;
