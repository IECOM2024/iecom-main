import { Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";

export default function CompetitionPage() {
  return (
    <PublicLayout>
      <Flex flexDir="column" w="100%">
        <Text w="100%" fontSize="2xl">
          IECOM 2024 Competition
        </Text>
        <Flex w="100%" justifyContent="center" alignItems="center">
          {
            "IECOM 2024 Competition is a competition held by Keluarga Mahasiswa Teknik Industri (MTI) ITB"
          }
        </Flex>
      </Flex>
    </PublicLayout>
  );
}
