import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdArrowForward, MdCalendarMonth, MdTimer } from "react-icons/md";
import { Slide } from "~/utils/animation/entrance-animation";

export const PreEventCards = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")[0];

  return (
    <Slide from="bottom">
      <Flex
        flexDir="column"
        w="100%"
        alignItems="center"
        mt="9em"
        fontFamily="heading"
        fontWeight="bold"
        pos="relative"
        zIndex="10"
      >
        {/* First Preevent */}

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="whiteCream"
          w="min(65em,90%)"
          h="auto"
          py="2em"
          px="2em"
          borderRadius="2em"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
          <Flex>
            <Flex w="65%">
              <Flex flexDir="column">
                <Text color="blue" fontSize="xl">
                  IECOM Series #1:
                </Text>
                <Text
                  color="blue"
                  fontSize="4xl"
                  fontWeight="bolder"
                  mt="1rem"
                  fontFamily="body"
                >
                  Behind The Success of A Social Entrepreneurship
                </Text>
                <Text color="blue" fontSize="md" mt="1em">
                  Lorem ipsum dolor sit amet consectetur. Eget ultrices lobortis
                  consequat morbi sodales sollicitudin tristique faucibus. Nunc
                  commodo mi dolor ipsum odio in cras. Eu posuere libero
                  tristique praesent nunc sit mollis. Gravida mi vulputate massa
                  in mauris tortor bibendum.
                </Text>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdCalendarMonth size="1.5em" />
                  <Text ml="1em"> 24th October 2023</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdTimer size="1.5em" />
                  <Text ml="1em"> {"13.00 - 15.28 WIB (UTC +7:00)"}</Text>
                </Flex>
                <Button
                  w="max(40%,10em)"
                  px="2em"
                  py="1em"
                  fontSize="1.5em"
                  color="blue"
                  mt="1em"
                >
                  Register <MdArrowForward size="1.5em" />
                </Button>
              </Flex>
            </Flex>
            <Flex w="35%" justifyContent="center" alignItems="center">
              <Image src="preevent-2.webp" alt="" w="100%" h="auto" />
            </Flex>
          </Flex>
        </Flex>

        {/* Second Preevent */}
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="whiteCream"
          w="min(65em,90%)"
          h="auto"
          py="2em"
          px="2em"
          borderRadius="2em"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          mt="2em"
        >
          <Flex>
            <Flex w="65%">
              <Flex flexDir="column">
                <Text color="blue" fontSize="xl">
                  IECOM Series #2:
                </Text>
                <Text
                  color="blue"
                  fontSize="4xl"
                  fontWeight="bolder"
                  mt="1rem"
                  fontFamily="body"
                >
                  Enhancing Business With The Power of Digital Platform
                </Text>
                <Text color="blue" fontSize="md" mt="1em">
                  Lorem ipsum dolor sit amet consectetur. Eget ultrices lobortis
                  consequat morbi sodales sollicitudin tristique faucibus. Nunc
                  commodo mi dolor ipsum odio in cras. Eu posuere libero
                  tristique praesent nunc sit mollis. Gravida mi vulputate massa
                  in mauris tortor bibendum.
                </Text>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdCalendarMonth size="1.5em" />
                  <Text ml="1em"> 24th November 2023</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdTimer size="1.5em" />
                  <Text ml="1em"> {"13.00 - 15.28 WIB (UTC +7:00)"}</Text>
                </Flex>
                <Button
                  w="max(40%,10em)"
                  px="2em"
                  py="1em"
                  fontSize="1.5em"
                  color="blue"
                  mt="1em"
                >
                  Register <MdArrowForward size="1.5em" />
                </Button>
              </Flex>
            </Flex>
            <Flex w="35%" justifyContent="center" alignItems="center">
              <Image src="preevent-3.webp" alt="" w="100%" h="auto" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Slide>
  );
};
