import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Header } from "@/components/landing-page/Header";

export default function Home() {
  return (
    <>
      <View
        as="main"
        className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto"
      >
        <Text variant="h1" className="text-5xl font-bold">
          Welcome to Ledgerly
        </Text>
        <Button asChild>
          <Link href="/dashboard">Sign in</Link>
        </Button>
      </View>
    </>
  );
}
