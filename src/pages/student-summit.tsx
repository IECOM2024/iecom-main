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
import { Slide } from "~/utils/animation/entrance-animation";
import { Heading } from "@chakra-ui/react";
import { PreEventCards } from "~/components/pre-event/PreEventCards";
import { PreEventFAQ } from "~/components/pre-event/PreEventFAQ";

const STUDENT_SUMMIT_DESCRIPTION =
  "Student Summit is a series of events that will be held before the main event. This event is held to introduce the main event to the participants and to provide information about the main event. Pre-event will be held in the form of webinars, workshops, and competitions. The pre-event will be held in October and November 2023.";

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default function EventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 600px)")[0];

  return (
    <PublicLayout>
      <Flex flexDir="column" mb="6rem">
        {/* Main Description Group*/}

        <Flex bgImage="preevent-1.webp" borderBottom="1px solid black">
          <Slide from="left">
            <Flex
              flexDir="column"
              w="80%"
              mt="4rem"
              ml="4.5em"
              pb={{ base: "2rem", md: "14rem" }}
            >
              <Text
                w="100%"
                fontSize="7xl"
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Student Summit
              </Text>
              <Text
                w="100%"
                fontFamily="heading"
                color="blue"
                fontSize="lg"
                fontWeight="bold"
                wordBreak="normal"
              >
                {STUDENT_SUMMIT_DESCRIPTION}
              </Text>
              <Button
                w="8em"
                h="2em"
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
          <Flex
            position="relative"
            borderRight={{ base: "none", md: "solid #054E83" }}
            borderLeft={{ md: "none", base: "solid #054E83" }}
            borderBlock={{ base: "none", md: "solid #054E83" }}
            borderWidth={{ base: "4px", md: ".625rem" }}
            width="80%"
            height={{ base: "35rem", md: "12.5rem" }}
          >
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <TimelineCard
                  key={index}
                  title={`Phase ${index + 1}`}
                  date="20 September 2022"
                  top={`calc(${index * 5}rem - 1rem)`}
                  left={`calc(${
                    (index - 4 * Math.floor(index / 4)) * 18
                  }rem - 8rem)`}
                  isLower={index > 3}
                />
              ))}
          </Flex>
        </VStack>

        <PreEventCards />

        {/* FAQ Group */}
        <Box pos="relative" top="-4em" background="brown.3">
          <PreEventFAQ/>
        </Box>
      </Flex>
    </PublicLayout>
  );
}

const TimelineCard = ({
  title,
  top,
  date,
  left,
  isLower = false,
  ...props
}: FlexProps & { title: string; date: string; isLower?: boolean }) => {
  const topPos = !isLower
    ? "calc(-1.75rem - .625rem/2)"
    : "calc(12.5rem - 1.75rem - .625rem * 3/2)";
  return (
    <Flex
      direction={{ base: "row", md: "column" }}
      position="absolute"
      top={{
        base: top as string,
        md: topPos,
      }}
      left={{ md: left as string, base: "calc(-1rem - 2px)" }}
      {...props}
      width="fit-content"
      alignItems="center"
      gap={{ base: "1rem", md: "0" }}
    >
      <Flex
        bgColor="white"
        borderRadius="50%"
        height={{ base: "2rem", md: "3.5rem" }}
        width={{ base: "2rem", md: "3.5rem" }}
      />
      <VStack spacing={0} align={{ base: "flex-start", md: "center" }}>
        <Text
          fontSize={fontSizes.md}
          fontWeight="semibold"
          color="blue"
          fontFamily="body"
        >
          {date}
        </Text>
        <Text fontSize={fontSizes.base} color="blue" fontFamily="Inter">
          {title}
        </Text>
      </VStack>
    </Flex>
  );
};

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

const paddings = {
  xs: {
    base: ".75rem",
    md: "1rem",
  },
  sm: {
    base: "1rem",
    md: "2rem",
  },
  base: {
    base: "1.25rem",
    md: "3.5rem",
  },
  md: {
    base: "1.5rem",
    md: "4rem",
  },
  lg: {
    base: "1.75rem",
    md: "5rem",
  },
  xl: {
    base: "2rem",
    md: "6rem",
  },
  xxl: {
    base: "2.25rem",
    md: "7rem",
  },
  xxxl: {
    base: "2.5rem",
    md: "9rem",
  },
};

const timelineData = {
  date1: "20 September 2023",
  date2: "25 September 2023",
  date3: "25 October 2023",
  date4: "25 September 2023",
  date5: "20 September 2023",
  date6: "25 September 2023",
  date7: "25 October 2023",
  date8: "25 September 2023",
};

const PhaseName = {
  phase1: "Pre-Event 1",
  phase2: "Pre-Event 2",
  phase3: "Essay Competition",
  phase4: "Pre-Event 2",
  phase5: "Pre-Event 1",
  phase6: "Essay Competition",
  phase7: "Essay Competition",
  phase8: "Pre-Event 2",
};
