import { Button, Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EventPage() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <PublicLayout>
      <Flex flexDir="column">
        <Text w="100%" fontSize="2xl">
          IECOM 2024 Event
        </Text>
        <Flex w="100%" justifyContent="center" alignItems="center">
          {
            "IECOM 2024 Eventis a Event held by Keluarga Mahasiswa Teknik Industri (MTI) ITB"
          }
        </Flex>
        <Flex w="100%" justifyContent="center" alignItems="center">
          {session?.user.role === "ADMIN" ? (
            <Button onClick={() => router.push("event-administration")}>
              Manage Event
            </Button>
          ) : (
            <Button onClick={() => router.push("event-registration")}>
              Register Event
            </Button>
          )}
        </Flex>
      </Flex>
    </PublicLayout>
  );
}
