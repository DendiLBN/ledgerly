import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";

export default function Home() {
  return (
    <View
      as="main"
      className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto"
    >
      <Text variant="h1" className="text-5xl font-bold">
        Welcome to Ledgerly
      </Text>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </View>
  );
}
