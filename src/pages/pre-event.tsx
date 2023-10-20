import {
  Button,
  Flex,
  Image,
  Text,
  VStack,
  FlexProps,
  Box,
  useMediaQuery,
  HStack,
  Center,
  IconButton,
  ButtonGroup,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MdArrowDropDown } from "react-icons/md";
import { relative } from "path";
import { Slide, FadeIn } from "~/utils/animation/entrance-animation";
import { Heading } from "@chakra-ui/react";
import { PreEventCards } from "~/components/pre-event/PreEventCards";
import { PreEventFAQ } from "~/components/pre-event/PreEventFAQ";
import { useIsMobile } from "~/utils/hooks/useIsMobile";
import { Timeline, timelineContent } from "~/components/common/Timeline";

const PRE_EVENT_DESCRIPTION =
  "Pre-event consist of a series of events designed for you to explore more about Industrial Engineering and Engineering Management. Pre-event will be held in the form of Color Run and Seminar. The pre-event will be held in October and November 2023. Grab the chance to learn from best expertise who’ll share their knowledge and experience about Sustainable Industry!";
const PRE_EVENT_THEME =
  "Sustainable Economic Growth: Navigating the Path to Prosperity, Equity, and Environment Resilience";
const PRE_EVENT_THEME_DESC =
  "Underscoring the idea that sustainable innovation in industrial engineering can be a profitable approach. By developing and implementing environmentally friendly technologies and processes, businesses and industries can not only reduce their ecological footprint but also benefit from increased efficiency and profitability. The integration of sustainability principles into industrial engineering practices is critical to addressing global environmental challenges while improving economic well-being. This is aligned with the idea that environmentally responsible practices can provide economic benefits, making them a key driver for a more sustainable and prosperous future.";

const TIMELINE_DATA: timelineContent[] = [
  {
    dateStr: "16 October 2023",
    title: "Open Registration",
  },
  {
    dateStr: "1 November 2023",
    title: "Registration Closed for Color Run",
  },
  {
    dateStr: "5 November 2023",
    title: "Color Run",
  },
  {
    dateStr: "7 - 9 November 2023",
    title: "Instagram Takeover",
  },
  {
    dateStr: "10 November 2023",
    title: "Registration Closed for Seminar & Workshop",
  },
  {
    dateStr: "11 November 2023",
    title: "Seminar & Workshop",
  },
]

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default function EventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  return (
    <PublicLayout title="Pre-Event">
      <Flex flexDir="column">
        {/* Main Description Group*/}

        <Flex bgImage="preevent-1.webp" bgSize={{base: "auto 100%",lg: "100% auto"}} bgRepeat="no-repeat">
          <Slide from="left">
            <Flex
              flexDir="column"
              w="80%"
              mt="4rem"
              ml={{base: "5vw", md:"4.5em"}}
              pb={{ base: "2rem", md: "14rem" }}
            >
              <Text
                w="100%"
                fontSize={{base: "5xl", md:"7xl"}}
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Pre-event
              </Text>
              <Text
                w="100%"
                fontFamily="heading"
                color="blue"
                fontSize={{base: "md", md:"lg"}}
                fontWeight="bold"
                wordBreak="normal"
                textAlign="justify"
              >
                {PRE_EVENT_DESCRIPTION}
              </Text>
              <Button
                w={{base: "90%", md:"8em"}}
                h="2em"
                mx={{base: "auto", md:"0"}}
                mt="3em"
                mb="6em"
                fontSize="xl"
                color="blue"
              >
                Register Now!
              </Button>
            </Flex>
          </Slide>
        </Flex>

        {/*Theme Desc Group */}
        <FadeIn>
          <Flex
            flexDir="column"
            w="100%"
            justifyContent="center"
            alignItems="center"
            pos="relative"
            bg="rgba(5,79,133,1)"
            pt="8em"
            pb="10em"
          >
            <Text
              fontSize={{base: "4xl", md:"6xl"}}
              fontFamily="body"
              color="cream"
              fontWeight="bold"
              textAlign="center"
            >
              Pre-event's Theme
            </Text>
            <Text
              fontSize={{base: "xl", md:"3xl"}}
              fontFamily="heading"
              color="cream"
              fontWeight="bold"
              wordBreak="normal"
              textAlign="center"
              w="80%"
              mt="2em"
            ></Text>
            <Accordion allowToggle w="min(80em, 90%)">
              <AccordionItem
                mt="1em"
                borderRadius="10px"
                mx="auto"
                color="cream"
                borderTop="none"
                borderBottom="none"
              >
                <h2>
                  <AccordionButton bg="none">
                    <Box flex="1" textAlign="center">
                      <Text fontSize="3xl" fontWeight="bold">
                        {PRE_EVENT_THEME}
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>

                <AccordionPanel bg="cream">
                  <Text
                    fontSize="xl"
                    fontFamily="heading"
                    color="blue"
                    fontWeight="bold"
                    wordBreak="normal"
                    textAlign="justify"
                    w="80%"
                    borderRadius="10px"
                    mx="auto"
                  >
                    {PRE_EVENT_THEME_DESC}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </FadeIn>

        {/* Timeline Group */}
        <VStack
          color="blue"
          spacing={{ base: "2rem", md: "3rem" }}
          width="80%"
          mb={{ base: "2rem", md: "4rem" }}
          mt="5rem"
          mx="auto"
        >
          <Heading fontSize={fontSizes.xxl} fontFamily="body">
            PHASE & TIMELINE
          </Heading>
          <Timeline timelineContent={TIMELINE_DATA}/>
        </VStack>

        <PreEventCards />

        {/* FAQ Group */}
        <Box pos="relative" top="-4em" background="brown.3">
          <PreEventFAQ />
        </Box>
        <Box pos="relative">
          <Box w="100%" h="4em" bg="brown.3" pos="absolute" top="-4em" />
        </Box>
      </Flex>
    </PublicLayout>
  );
}

const fontSizes = {
  xs: {
    base: "0.75rem",
    md: "1rem",
  },
  sm: {
    base: "0.875rem",
    md: "1.25rem",
  },
  base: {
    base: "1rem",
    md: "1.5rem",
  },
  md: {
    base: "1.15rem",
    md: "2rem",
  },
  lg: {
    base: "1.25rem",
    md: "2.5rem",
  },
  xl: {
    base: "1.5rem",
    md: "3rem",
  },
  xxl: {
    base: "1.75rem",
    md: "3.5rem",
  },
  xxxl: {
    base: "2rem",
    md: "4rem",
  },
};