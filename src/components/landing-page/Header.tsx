import Link from "next/link";

import Container from "@/components/common/container";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Text } from "@/components/common/text";

import { View } from "@/components/common/view";

export const Header = () => {
  return (
    <View className="mt-8 mb-12">
      <Container>
        <View className="flex justify-between items-center gap-4">
          <View className="flex items-center gap-4">
            <Text className="font-bold">
              <Link href="/dashboard">Ledgerly</Link>
            </Text>

            <SignedIn>
              <Text className="-ml-2"></Text>
            </SignedIn>
          </View>
          <View>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </View>
        </View>
      </Container>
    </View>
  );
};
