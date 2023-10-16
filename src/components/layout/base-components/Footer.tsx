import { Flex, Image, Text } from "@chakra-ui/react";
import { MdCamera, MdCameraFront, MdPhotoCamera } from "react-icons/md";

export const Footer = () => {
  return (
    <Flex
      bg="cream"
      w="100%"
      h="auto"
      justifyContent="space-between"
      alignItems="center"
      fontFamily="heading"
      fontSize="xl"
      fontWeight="bold"
      color="black"
      py="3em"
      px="2em"
      zIndex="10"
    >
      <Image src="main-icon.webp" alt="IECOM 2024" w="auto" h="6em" />
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Flex gap="1em">
          <MdPhotoCamera size="1.5em" color="black" />
          <Text>@iecomitb</Text>
        </Flex>
        <Flex gap="2em">
          <MdCamera size="1.5em" color="black" />
          <Text ml="0.5em">@iecomitb</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
