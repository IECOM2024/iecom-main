import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";

export default function CompetitionPage() {
  return (
    <PublicLayout>
      <Image
        src="main-comp-1.webp"
        alt=""
        position="absolute"
        zIndex="-1"
      ></Image>
      <Flex flexDir="column" marginTop="30vh" marginLeft="5vw" >
        <Text fontSize="6xl" fontWeight="bold" color="blue">
          Main Competition
        </Text>
        <Text fontWeight="bold" color="blue" mr="50vw">
          Lorem ipsum dolor sit amet consectetur. Eget ultrices lobortis
          consequat morbi sodales sollicitudin tristique faucibus. Nunc commodo
          mi dolor ipsum odio in cras. Eu posuere libero tristique praesent nunc
          sit mollis. Gravida mi vulputate massa in mauris tortor bibendum
          tincidunt.
        </Text>
        <Button color="blue" width="15%" mt="5vh" fontWeight="bold" fontFamily="alsans" mb="20vh">
          Learn More
        </Button>
      </Flex>

      <Flex bg="blue" flexDir="column" >
        <Text color="cream" fontSize="6xl" mt="3em" fontWeight="bold" textAlign="center">
          Grand Theme
        </Text>
        <Text fontSize="4xl" color="cream" fontWeight="bold" textAlign="center" mb="3em">
        “Entrepreneurship for Revamping Southeast Asia's Business Facing Disruptive Era”
        </Text>
      </Flex>
    </PublicLayout>
  );
}
