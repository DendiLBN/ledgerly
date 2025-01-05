import { Container } from "@/components/common/container";

import { Text } from "@/components/common/text";
import { View } from "@/components/common/view";

export const Footer = () => {
  return (
    <View as="footer" className="mt-8 mb-12">
      <Container>
        <Text className="text-sm">Ledgerly {new Date().getFullYear()}</Text>
        <Text className="text-sm">
          Created by Ledgerly with Next.js, Xata, Clerk
        </Text>
      </Container>
    </View>
  );
};
