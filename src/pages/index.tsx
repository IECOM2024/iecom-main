import {
  Box,
  Button,
  Flex,
  FlexProps,
  Grid,
  Heading,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import {
  FadeIn,
  Pops,
  Slide,
  StaggeredPops,
  StaggeredSlide,
} from "~/utils/animation/entrance-animation";
import { NewsModal } from "~/components/landing-page/NewsModal";
import { useIsMobile } from "~/utils/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <PublicLayout>
        {/* First Section */}
        <Slide from="left">
          <Flex
            paddingBlock={paddings.xxl}
            paddingInline={paddings.xxxl}
            gap={{ base: "2rem", md: "4rem" }}
            alignItems="center"
            flexDir={isMobile ? "column" : "row"}
          >
            <Image
              alt="IECOM"
              src="main-icon.webp"
              h={{ base: "10rem", md: "18rem" }}
              mb={isMobile ? "3em" : "0"}
            />
            <VStack
              align="flex-start"
              color="blue"
              h="100%"
              justifyContent="center"
            >
              <Heading
                fontFamily="body"
                fontSize={{ base: fontSizes.lg.base, md: fontSizes.xl.md }}
              >
                Industrial Engineering and Engineering Management Competition
              </Heading>
              <Box>
                <Text
                  fontSize={fontSizes.base}
                  fontFamily="body"
                  display={"inline"}
                  color="brown.3"
                  fontWeight="bold"
                >
                  {"Engineering Horizons: "}
                </Text>
                <Text
                  fontSize={fontSizes.base}
                  fontFamily="body"
                  display={"inline"}
                  color="brown.1"
                >
                  Empowering Communities through Sustainable Industrial
                  Innovation
                </Text>
              </Box>
              {/* <Button fontSize={fontSizes.base} size={{ base: "sm", md: "lg" }}>
                Learn More </Button> */}
            </VStack>
          </Flex>
        </Slide>

        {/* Second Section */}

        <Flex
          paddingBlock={paddings.base}
          pl={paddings.xxxl}
          pr={paddings.lg}
          direction={{ base: "column", lg: "row" }}
          gap="2rem"
          bgColor="brown.3"
          justifyContent="space-between"
          mb={isMobile ? "3em" : "0"}
        >
          <Text
            fontSize={fontSizes.base}
            fontFamily="Inter"
            textAlign="justify"
            width={{ base: "auto", lg: "65ch" }}
          >
            {COMP_DESCRIPTION}
          </Text>

          <Flex gap="1.5rem" mx={{ base: "auto", md: undefined }}>
            <Image
              alt="logo-mti"
              src="landing-page/logo-mti.webp"
              width={{ base: "5rem", md: "10.5rem" }}
              aspectRatio={1}
            />
            <Image
              alt="logo-itb.webp"
              src="landing-page/logo-itb.webp"
              width={{ base: "5rem", md: "10.5rem" }}
              aspectRatio={1}
            />
          </Flex>
        </Flex>

        {/* Third Section */}
        <VStack
          padding={paddings.xl}
          width="100%"
          spacing={{ base: "3rem", md: "5rem" }}
        >
          <VStack
            color="blue"
            width="100%"
            spacing={{ base: "1.5rem", md: "2.5rem" }}
          >
            <FadeIn>
              <Heading fontSize={fontSizes.xxl} fontFamily="body">
                OUR EVENTS
              </Heading>
            </FadeIn>
            <Slide from="right">
              <EventCard
                title="Pre Event"
                content={PRE_EVENT_DESCRIPTION}
                img="landing-page/pre-event.webp"
              />
            </Slide>
            <Slide from="left">
              <EventCard
                title="Case Competition"
                content={CASE_COMPETITION_DESCRIPTION}
                img="landing-page/case-competition.webp"
              />
            </Slide>
            <Slide from="right">
              <EventCard
                title="Essay Competition"
                content={ESSAY_COMPETITION_DESCRIPTION}
                img="landing-page/essay-competition.webp"
              />
            </Slide>
            <Slide from="left">
              <EventCard
                title="Student Summit"
                content={GRAND_SUMMIT_DESCRIPTION}
                img="landing-page/grand-summit.webp"
              />
            </Slide>
          </VStack>
          <VStack
            color="blue"
            spacing={{ base: "2rem", md: "3rem" }}
            width="100%"
            mb={{ base: "2rem", md: "4rem" }}
          >
            <Heading fontSize={fontSizes.xxl} fontFamily="body">
              PHASE & TIMELINE
            </Heading>
            <Show above="md">
              <Flex
                height="20em"
                width="100%"
                bg="whiteCream"
                borderRadius="10px"
                p="2em"
              >
                <Flex
                  height="100%"
                  overflowX="scroll"
                  width="100%"
                  direction="column"
                  justifyContent="end"
                  padding="3rem 1rem"
                  sx={{
                    "&::-webkit-scrollbar": {
                      height: "2px",
                    },
                    "&::-webkit-scrollbar-track": {
                      height: "2px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#054E83",
                      borderRadius: "1rem",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#054E83",
                    },
                  }}
                >
                  <Flex
                    position="relative"
                    backgroundColor="blue"
                    height="1.5rem"
                    width="156rem"
                    borderRadius="full"
                  >
                    {timelineContent
                      .map((e, index) => (
                        <TimelineCard
                          key={index}
                          title={e.title}
                          date={e.dateStr}
                          bottom="-1rem"
                          left={`calc(${index * 20}rem )`}
                        />
                      ))}
                  </Flex>
                </Flex>
              </Flex>
            </Show>
            <Show below="md">
              <Flex
                position="relative"
                borderRight={{ base: "none", md: "solid #054E83" }}
                borderLeft={{ md: "none", base: "solid #054E83" }}
                borderBlock={{ base: "none", md: "solid #054E83" }}
                borderWidth={{ base: "4px", md: ".625rem" }}
                width="80%"
                height={{ base: "35rem", md: "12.5rem" }}
              >
                {timelineContent
                  .map((e, index) => (
                    <TimelineCard
                      key={index}
                      title={e.title}
                      date={e.dateStr}
                      top={`calc(${index * 5}rem - 1rem)`}
                      left={`calc(${
                        (index - 4 * Math.floor(index / 4)) * 18
                      }rem - 8rem)`}
                      isLower={index > 3}
                    />
                  ))}
              </Flex>
            </Show>
          </VStack>
          {/* <VStack>
            <Heading
              fontSize={fontSizes.xxl}
              fontFamily="body"
              textAlign="center"
              color="blue"
              mb={{ base: "2rem", md: "4rem" }}
              textShadow="2px 2px #F9F6F0"
            >
              WHAT THEY SAY ABOUT IECOM
            </Heading>
            <Grid
              gap="1rem"
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
            >
              <StaggeredPops>
                {Testimonial.map((item, index) => (
                  <TestimonialCard
                    key={index}
                    content={item.content}
                    img={"landing-page/logo-itb.webp"}
                    author={item.author}
                    authorPos={item.authorPos}
                  />
                ))}
              </StaggeredPops>
            </Grid>
          </VStack>*/}
        </VStack>

        <NewsModal />
      </PublicLayout>
    </>
  );
}

const COMP_DESCRIPTION =
  "IECOM is an international industrial engineering competition designed for undergraduate students majoring in Industrial Engineering, Engineering Management, or other related fields, held by Industrial Engineering Student Union of Bandung Institute of Technology (MTI ITB).";

const PRE_EVENT_DESCRIPTION =
  "IECOM 2024 will give you a series of events to explore more about Industrial Engineering, especially to be the answer to today's problem. Grab the chance to learn from best expertise who’ll share their knowledge and experience about Sustainable Industry";

const CASE_COMPETITION_DESCRIPTION =
  "IECOM 2024's case competition is designed for you who are thirsty for challenge!. Through 4 stage of competition, this competition will challenge your knowledge of Industrial Engineering and Engineering Management";

const ESSAY_COMPETITION_DESCRIPTION =
  "The essay competition provides a place to be creative and solution-oriented to answer a problem related to the main topic “Refining Southeast Asia’s Business through Entrepreneurship in the Disruptive Era”";

const GRAND_SUMMIT_DESCRIPTION =
  "The Student Summit is a national seminar that will discuss current issues related to IECOM 2024's grand theme “Industry development through digitalization and innovation”.";

const Testimonial = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum.",
    img: "landing-page/testimonial-1.webp",
    author: "John Doe",
    authorPos: "CEO of Lorem Ipsum",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum.",
    img: "landing-page/testimonial-2.webp",
    author: "Jonathan Doe",
    authorPos: "CEO of Lorem Ipsum",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum.",
    img: "landing-page/testimonial-3.webp",
    author: "Michael Doe",
    authorPos: "CEO of Lorem Ipsum",
  },
];

const timelineContent: {
  dateStr: string;
  title: string;
}[] = [
  {
    dateStr: "16 October 2023",
    title: "Pre-event Open Registration",
  },
  {
    dateStr: "21 October 2023",
    title: "Competition Open Registration"
  },
  {
    dateStr: "5 November 2023",
    title: "Color Run"
  },
  {
    dateStr: "11 November 2023",
    title: "Seminar & Workshop"
  },
  {
    dateStr: "25 November 2023",
    title: "Preliminary"
  },
  {
    dateStr: "1 December 2023",
    title: "Essay Last Submission"
  },
];

const EventCard = ({
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: string;
}) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      bgColor="brown.5"
      padding={{ base: "1rem 1.5rem 1rem 3rem", md: "0 0 0 3rem" }}
      width="100%"
      gap={{ base: "1.25rem", md: "2rem" }}
    >
      <VStack align="flex-start">
        <Heading
          fontSize={fontSizes.lg}
          fontFamily="body"
          paddingTop={{ base: 0, md: "1rem" }}
        >
          {title}
        </Heading>
        <Text
          fontSize={fontSizes.base}
          fontWeight="semibold"
          textAlign="justify"
          paddingBottom={{ base: 0, md: "1rem" }}
        >
          {content}
        </Text>
      </VStack>
      <Image
        alt="image"
        src={img}
        aspectRatio={16 / 9}
        height={{ base: "auto", md: "16rem" }}
      />
    </Flex>
  );
};

const TimelineCard = ({
  title,
  date,
  top,
  left,
  isLower = false,
  ...props
}: FlexProps & { title: string; date: string; isLower?: boolean }) => {
  const topPos = !isLower
    ? "calc(-1.75rem - .625rem/2)"
    : "calc(12.5rem - 1.75rem - .625rem * 3/2)";
  return (
    <Flex
      direction={{ base: "row", md: "column-reverse" }}
      position="absolute"
      top={top ?? topPos}
      left={{ md: left as string, base: "calc(-1rem - 2px)" }}
      {...props}
      width="16em"
      alignItems="center"
      gap={{ base: "1rem", md: "0" }}
    >
      <Flex
        bgColor="white"
        borderRadius="50%"
        height={{ base: "2rem", md: "3.5rem" }}
        width={{ base: "2rem", md: "3.5rem" }}
      />
      <VStack
        spacing={0}
        align={{ base: "flex-start", md: "center" }}
        mb={{ md: "4em" }}
      >
        <Text
          fontSize={fontSizes.md}
          fontWeight="semibold"
          color="blue"
          fontFamily="body"
        >
          {date}
        </Text>
        <Box bg="blue" h="1px" w="80%" mx="auto" mt="0.2em" mb="1em"/>
        <Text fontSize={fontSizes.base} color="blue" fontFamily="heading" h="3em" textAlign="center">
          {title}
        </Text>
      </VStack>
    </Flex>
  );
};

const TestimonialCard = ({
  content,
  img,
  author,
  authorPos,
}: {
  content: string;
  img: string;
  author: string;
  authorPos: string;
}) => {
  return (
    <Flex
      direction="column"
      color="rgba(0, 0, 0, .71)"
      width="100%"
      fontFamily="Inter"
    >
      <Flex padding={paddings.sm} bgColor="brown.5">
        <Text
          fontWeight="semibold"
          fontSize={fontSizes.sm}
          textAlign="center"
          lineHeight="95%"
        >
          {content}
        </Text>
      </Flex>
      <Flex gap="1rem" alignItems="center" padding="1rem">
        <Image
          alt="image"
          src={img}
          borderRadius="50%"
          aspectRatio={1}
          height={{ base: "3.5rem", md: "5rem" }}
          objectFit="cover"
          objectPosition="center"
        />
        <VStack
          spacing={0}
          fontSize={fontSizes.xs}
          align="flex-start"
          lineHeight="100%"
        >
          <Text fontWeight="bold">{author}</Text>
          <Text fontWeight="semibold" color="rgba(0, 0, 0, .5)">
            {authorPos}
          </Text>
        </VStack>
      </Flex>
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
