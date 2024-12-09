import Link from "next/link";

import Container from "@/components/common/container";

import { Text } from "@/components/common/text";
import { View } from "@/components/common/view";

import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <View as="header" className="mt-8 mb-12">
      <Container>
        <View className="flex justify-between items-center gap-4">
          <View className="flex items-center gap-4">
            <Text className="font-bold">
              <Link href="/dashboard">Ledgerly</Link>
            </Text>
            <Text className="text-slate-300">/</Text>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </span>
            </SignedIn>
          </View>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </View>
      </Container>
    </View>
  );
};

export default Header;
