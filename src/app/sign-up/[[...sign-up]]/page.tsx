import { SignIn } from "@clerk/nextjs";

import Container from "@/components/common/container";

export default function SignUpPage() {
  return (
    <Container>
      <SignIn />
    </Container>
  );
}
