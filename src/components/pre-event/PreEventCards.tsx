import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  MdArrowForward,
  MdCalendarMonth,
  MdLocationPin,
  MdTimer,
} from "react-icons/md";
import { Slide } from "~/utils/animation/entrance-animation";

export const PreEventCards = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")[0];
  const router = useRouter();

  return (
    <Slide from="right">
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
        <Text
          fontSize="6xl"
          color="blue"
          fontWeight="bold"
          fontFamily="body"
          mb="1em"
          textAlign="center"
        >
          EVENTS
        </Text>
        {/* First Preevent */}
        <Box id="color-run"/>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="whiteCream"
          w="min(75em,90%)"
          h="auto"
          py="2em"
          px="2em"
          borderRadius="2em"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          
        >
          <Flex flexDir={isMobile ? "column" : "row"}>
            <Flex w={isMobile ? "100%" : "65%"}>
              <Flex flexDir="column">
                <Text color="blue" fontSize="xl">
                  Color Run
                </Text>
                <Text
                  color="blue"
                  fontSize="4xl"
                  fontWeight="bolder"
                  mt="1rem"
                  fontFamily="body"
                  textAlign="justify"
                >
                  Lace Up for Less Waste
                </Text>
                <Text
                  color="blue"
                  fontSize="md"
                  mt="1em"
                  textAlign="justify"
                  w={isMobile ? "100%" : "80%"}
                >
                  Color Run "Lace Up for Less Waste" is a 5-kilometer marathon
                  event to raise awareness about Environmental Stewardship,
                  which is a concept and practice that refers to the
                  responsibility of individuals, communities, organizations in
                  maintaining and caring for the environment in a responsible
                  and ethical manner. To support Environmental Stewardship,
                  participants are encouraged to bring their own bottles to the
                  Color Run and the flares used are cornstarch. In addition, the
                  committee will provide water stations at several points of the
                  event and the running track.
                </Text>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdCalendarMonth size="1.5em" />
                  <Text ml="1em"> Sunday, November 5th 2023</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdTimer size="1.5em" />
                  <Text ml="1em"> {"06.00 - 10.00 WIB (UTC +7:00)"}</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdLocationPin size="1.5em" />
                  <Text ml="1em"> {"Ganesha Sport Facility, Bandung"}</Text>
                </Flex>
                <Button
                  w={isMobile ? "100%" : "max(40%,10em)"}
                  px="2em"
                  py="1em"
                  fontSize="1.5em"
                  color="blue"
                  mt="1em"
                  onClick={() =>
                    router.push("/event-registration", {
                      query: {
                        eventType: "color_run",
                      },
                    })
                  }
                >
                  Register <MdArrowForward size="1.5em" />
                </Button>
              </Flex>
            </Flex>
            {!isMobile && (
              <Flex w="35%" justifyContent="center" alignItems="center">
                <Image src="preevent-2.webp" alt="" w="100%" h="auto" />
              </Flex>
            )}
          </Flex>
        </Flex>

        {/* Second Preevent */}
        <Box id="seminar-and-workshop"/>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="whiteCream"
          w="min(75em,90%)"
          h="auto"
          py="2em"
          px="2em"
          borderRadius="2em"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          mt="2em"
        >
          <Flex flexDir={isMobile ? "column" : "row"}>
            <Flex w={isMobile ? "100%" : "65%"}>
              <Flex flexDir="column">
                <Text color="blue" fontSize="xl">
                  Seminar and Workshop
                </Text>
                <Text
                  color="blue"
                  fontSize="4xl"
                  fontWeight="bolder"
                  mt="1rem"
                  fontFamily="body"
                  textAlign="justify"
                >
                  Sustainable Economic Growth: Navigating the Path to
                  Prosperity, Equity, and Environment Resilience
                </Text>

                <Flex color="blue" fontSize="md" mt="2em">
                  <MdCalendarMonth size="1.5em" />
                  <Text ml="1em"> Saturday, November 11th 2023</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdTimer size="1.5em" />
                  <Text ml="1em"> {"09.00 - 17.00 WIB (UTC +7:00)"}</Text>
                </Flex>
                <Flex color="blue" fontSize="md" mt="2em">
                  <MdLocationPin size="1.5em" />
                  <Text ml="1em"> {"SBM Auditorium, Bandung"}</Text>
                </Flex>
                <Button
                  w={isMobile ? "100%" : "max(40%,10em)"}
                  px="2em"
                  py="1em"
                  fontSize="1.5em"
                  color="blue"
                  mt="1em"
                  onClick={() =>
                    router.push("/event-registration", {
                      query: {
                        eventType: "seminar_and_workshop",
                      },
                    })
                  }
                >
                  Register <MdArrowForward size="1.5em" />
                </Button>
              </Flex>
            </Flex>
            {!isMobile && (
              <Flex w="35%" justifyContent="center" alignItems="center">
                <Image src="preevent-3.webp" alt="" w="100%" h="auto" />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Slide>
  );
};
