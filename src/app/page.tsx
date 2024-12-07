import { Button } from "@/components/ui/button";
import Link from "next/link";
import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";

export default function Home() {
  return (
    <View
      as="main"
      className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto"
    >
      <Text variant="h1" className="text-5xl font-bold">
        Welcome into Ledgerly
      </Text>
      <Text>
        <Button>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </Text>
    </View>
  );
}
