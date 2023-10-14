import {
  Box,
  Button,
  Flex,
  FlexProps,
  Grid,
  Heading,
  Image,
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

export default function Home() {
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
          >
            <Image
              alt="IECOM"
              src="main-icon.webp"
              h={{ base: "6rem", md: "18rem" }}
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
              <Button fontSize={fontSizes.base} size={{ base: "sm", md: "lg" }}>
                Learn More
              </Button>
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
            <Slide from="left">
              <EventCard
                title="Pre Event"
                content={PRE_EVENT_DESCRIPTION}
                img="landing-page/pre-event.webp"
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
                title="Grand Summit"
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
          <VStack>
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
          </VStack>
        </VStack>

        <NewsModal/>
      </PublicLayout>
    </>
  );
}

const COMP_DESCRIPTION =
  "IECOM is an international industrial engineering competition designed for undergraduate students majoring in Industrial Engineering, Engineering Management, or other related fields, held by Industrial Engineering Student Union of Bandung Institute of Technology (MTI ITB).";

const PRE_EVENT_DESCRIPTION =
  "IECOM 2022 will also give you a series of events to explore more about Industrial Engineering, especially to be the answer to today's problem. Grab the chance to learn from best expertise who’ll share their knowledge and experience about Sustainable Industry";

const ESSAY_COMPETITION_DESCRIPTION =
  "The essay competition provides a place to be creative and solution-oriented to answer a problem related to the main topic “Refining Southeast Asia’s Business through Entrepreneurship in the Disruptive Era”";

const GRAND_SUMMIT_DESCRIPTION =
  "The Grand Summit is a national seminar that will discuss current issues related to IECOM 2022's grand theme “Industry development through digitalization and innovation”.";

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
        <Heading fontSize={fontSizes.lg} fontFamily="body">
          {title}
        </Heading>
        <Text fontSize={fontSizes.base} fontWeight="semibold" textAlign="justify">
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
