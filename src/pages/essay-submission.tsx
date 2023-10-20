import { Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";

export default function EssaySubmissionPage() {
  const uploadedFileStateArr = useState<File | null | undefined>(null);

  return (
    <AuthorizedRoleLayout>
      <Flex flexDir="column" color="cream" fontWeight="bold">
        <Text fontSize="4xl" bg="blue" py="0.8em" px="3em">
          Essay Submission
        </Text>
        <Flex
          mt="2em"
          border="1px solid black"
          borderRadius="10px"
          w="min(60em, 90%)"
          mx="auto"
          flexDir="column"
          bg="whiteCream"
          p="1em"
        >
          <Text fontSize="2xl" color="brown.3" fontWeight="bold">
            Submission Rules :
          </Text>
          <OrderedList color="blue">
            <ListItem>Essay must not racist</ListItem>
            <ListItem>Essay must respect Labora Lestari Purba</ListItem>
            <ListItem>Essay must be in English</ListItem>
          </OrderedList>
          <Text fontSize="2xl" color="brown.3" fontWeight="bold" mt="2em">
            {" "}
            Submit Your Essay Here
          </Text>
          <FileInput fileStateArr={uploadedFileStateArr} />
        </Flex>
      </Flex>
    </AuthorizedRoleLayout>
  );
}
