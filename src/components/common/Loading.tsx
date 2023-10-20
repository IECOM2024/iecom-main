import { Flex, Spinner, Text } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex
      bg="whiteCream"
      w="min(40em,90%)"
      mx="auto"
      mt="1em"
      fontSize="3xl"
      color="blue"
    >
      <Spinner color="blue" mx="auto" size="xl" />
      <Text textAlign="center" mx="auto" mt="1em" fontSize="lg">
        Loading...
      </Text>
    </Flex>
  );
};
