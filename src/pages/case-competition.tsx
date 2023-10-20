import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { PublicLayout } from "~/components/layout/PublicLayout";
import {
  FadeIn,
  Slide,
  StaggeredPops,
  VisGrow,
} from "~/utils/animation/entrance-animation";
import { ComingSoon } from "~/components/ComingSoon";
import { Timeline, timelineContent } from "~/components/common/Timeline";

const COMP_DESCRIPTION =
  "IECOM’s main competition is designed for those who are thirsty for a challenge! Through this four-stage competition, each team of three will be challenged to implement Industrial Engineering body of knowledge to provide an answer for real life problems. Every team will have a chance to enhance their critical thinking and problem solving skills to make the most of the possibilities that exist from the cases.";
const COMP_REQUIREMENTS = [
  "Applicants should be currently enrolled university students, and this must be confirmed by presenting a valid student ID",
  "Students from universities across Southeast Asia are welcomed to participate",
  "Each team should consist of three members (can be from different universities), all of whom are pursuing a degree in Industrial Engineering or a related field.",
  "Any member change in the team is not allowed once the team is registered",
  "Proficiency in the English language is required",
  "The IECOM 2024 committee reserves the right to disqualify participants who violate said rules",
];
const PRIZE: [number, string, string][] = [
  [0.8, "USD 1500", "2nd"],
  [1, "USD 2000", "1st"],
  [0.6, "USD 1000", "3rd"],
];
const REGIST_INFO: [string, number, string, string][] = [
  [
    "Early Bird Registration",
    20,
    "300000",
    "Will be opened until 21th of November 2023",
  ],
  [
    "Normal Registration",
    26,
    "375000",
    "Will be opened on 22th of November 2023",
  ],
];

const TIMLINE_CONTENT: timelineContent[] = [
  ["Early Bird Registration", "21-31 October 2023"],
  ["Regular Registration", "1-21 November 2023"],
  ["D-Day Preliminary Stage", "25 November 2023"],
  ["Preliminary Stage Announcement", "1 December 2023"],
  ["D-Day Simulation Stage", "16 December 2023"],
  ["Simulation Stage Announcement", "30 December 2023"],
  ["D-day Amazing Race", " 26 January 2024"],
  ["Finalist Announcement", "28 January 2024"],
  ["D-Day Grand Final", " 30 January 2024"],
  ["Awarding Night", "30 January 2024"],
].map((e) => ({
  title: e[0] ?? "",
  dateStr: e[1] ?? "",
}));

export default function MainCompetitionPage() {
  const isMobile = useMediaQuery("(max-width: 740px)")[0];
  const router = useRouter();

  return (
    <PublicLayout>
      <Flex flexDir="column" w="100%" pos="relative">
        {/* Main Description Group*/}

        <Flex bgImage="main-comp-1.webp" bgSize={{base: "auto 100%",lg: "100% auto"}}>
          <Slide from="left">
            <Flex flexDir="column" w="80%" mt="12rem" ml="4.5em">
              <Text
                w="100%"
                fontSize="6xl"
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Case Competition
              </Text>
              <Text
                w="100%"
                fontFamily="heading"
                color="blue"
                fontSize="lg"
                fontWeight="bold"
                wordBreak="normal"
              >
                {COMP_DESCRIPTION}
              </Text>
              <Button
                w={{ base: "90%", md: "12em" }}
                h="2em"
                mt="4em"
                mb="6em"
                fontSize="2xl"
                mx={{ base: "auto", md: "0" }}
                onClick={() => router.push("case-competition-guidebook.pdf")}
              >
                Download Guidebook!
              </Button>
            </Flex>
          </Slide>
        </Flex>

        {/* Grand Theme Group*/}
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
              fontSize="6xl"
              fontFamily="body"
              color="cream"
              fontWeight="bold"
            >
              Grand Theme
            </Text>
            <Text
              fontSize="2xl"
              fontFamily="heading"
              color="cream"
              fontWeight="bold"
              wordBreak="normal"
              textAlign="center"
              w="80%"
              mt="2em"
            >
              {`"Engineering Horizon: Empowering Communities through Sustainable Industrial Innovation"`}
            </Text>
          </Flex>
        </FadeIn>

        {/* Requirements  Group*/}
        <FadeIn>
          <Box>
            <Text
              w="100%"
              fontFamily="body"
              fontSize="5xl"
              color="blue"
              fontWeight="bold"
              mt="1em"
              textAlign="center"
            >
              Requirements
            </Text>
            <StaggeredPops delay={0.1}>
              {COMP_REQUIREMENTS.map((requirement, index) => (
                <Text
                  key={index}
                  w="min(45em,80%)"
                  fontFamily="heading"
                  fontSize="lg"
                  color="blue"
                  fontWeight="bold"
                  wordBreak="normal"
                  textAlign="center"
                  mt="2em"
                  mx="auto"
                  border="1px solid black"
                  borderRadius="10px"
                  p="0.5em"
                  bg="white"
                >
                  {requirement}
                </Text>
              ))}
            </StaggeredPops>
          </Box>
        </FadeIn>

        {/* Prize Group*/}
        <FadeIn>
          <Box>
            <Text
              w="100%"
              fontFamily="body"
              fontSize="5xl"
              color="blue"
              fontWeight="bold"
              my="1em"
              textAlign="center"
            >
              Prize
            </Text>
            <Flex
              w="min(45em,100%)"
              mx="auto"
              justifyContent="space-between"
              flexDir={isMobile ? "column" : "row"}
              alignItems={isMobile ? "center" : "flex-end"}
            >
              {PRIZE.map((prize, index) => {
                if (isMobile) {
                  return (
                    <Flex
                      w="90%"
                      alignItems="center"
                      my="1em"
                      bg="whiteCream"
                      justifyContent="space-between"
                      boxShadow="0 4px 4px rgba(0,0,0,0.25)"
                      h="6em"
                      key={index}
                    >
                      <Flex
                        w="100%"
                        fontFamily="heading"
                        fontSize="6xl"
                        color="cream"
                        stroke="black"
                        fontWeight="bold"
                        wordBreak="normal"
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {prize[2]}
                      </Flex>
                      <Text
                        w="100%"
                        fontFamily="heading"
                        fontSize="4xl"
                        color="cream"
                        fontWeight="bolder"
                        wordBreak="normal"
                        textAlign="center"
                        className="blue-stroke"
                      >
                        {prize[1]}
                      </Text>
                    </Flex>
                  );
                }
                return (
                  <VisGrow key={index} type="height" height={300 * prize[0]}>
                    <Flex
                      key={index}
                      w="14em"
                      flexDir="column"
                      justifyContent="flex-end"
                      alignItems="center"
                      py="1em"
                      mx="1em"
                      bg="whiteCream"
                      boxShadow="0 4px 4px rgba(0,0,0,0.25)"
                      h="100%"
                    >
                      <Flex
                        w="100%"
                        fontFamily="heading"
                        fontSize="6xl"
                        color="cream"
                        stroke="black"
                        fontWeight="bold"
                        wordBreak="normal"
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {prize[2]}
                      </Flex>
                      <Text
                        w="100%"
                        fontFamily="heading"
                        fontSize="4xl"
                        color="cream"
                        fontWeight="bolder"
                        wordBreak="normal"
                        textAlign="center"
                        className="blue-stroke"
                      >
                        {prize[1]}
                      </Text>
                    </Flex>
                    <Box w="100%" h="1em" />
                  </VisGrow>
                );
              })}
            </Flex>
          </Box>
        </FadeIn>

        {/* Timeline Group*/}
        <FadeIn>
          <VStack
            color="blue"
            spacing={{ base: "2rem", md: "3rem" }}
            width="80%"
            mb={{ base: "2rem", md: "4rem" }}
            mt="5rem"
            mx="auto"
          >
            <Text
              w="100%"
              fontFamily="body"
              fontSize="5xl"
              color="blue"
              fontWeight="bold"
              my="1em"
              textAlign="center"
            >
              Timeline
            </Text>

            <Timeline timelineContent={TIMLINE_CONTENT} />
          </VStack>
        </FadeIn>

        {/* Registration Group*/}
        <Text
          w="100%"
          fontFamily="body"
          fontSize="5xl"
          color="blue"
          fontWeight="bold"
          my="1em"
          textAlign="center"
        >
          Interested on joining the competition?
        </Text>
        <Flex
          flexDir={isMobile ? "column" : "row"}
          w="min(60em,90%)"
          justifyContent="space-between"
          mx="auto"
          mt="1em"
        >
          {REGIST_INFO.map((info, index) => (
            <Flex
              key={index}
              w={isMobile ? "90%" : "50%"}
              flexDir="column"
              justifyContent="flex-end"
              alignItems="center"
              my="1em"
              bg="whiteCream"
              boxShadow="0 4px 4px rgba(0,0,0,0.25)"
              h="auto"
              mx={isMobile ? "auto" : "1em"}
              p="1em"
              borderRadius="20px"
            >
              <Text
                w="100%"
                fontFamily="body"
                fontSize="4xl"
                color="blue"
                stroke="black"
                fontWeight="bold"
                wordBreak="normal"
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                borderRadius="20px"
              >
                {info[0]}
              </Text>
              <Text
                w="100%"
                fontFamily="heading"
                fontSize="5xl"
                color="blue"
                fontWeight="bolder"
                wordBreak="normal"
                textAlign="center"
                py="0.5em"
              >
                USD {info[1]}
              </Text>
              <Flex alignItems="center" w="100%">
                <Box h="1px" w="40%" bg="black" />
                <Text w="20%" textAlign="center">
                  OR
                </Text>
                <Box h="1px" w="40%" bg="black" />
              </Flex>
              <Text
                w="100%"
                fontFamily="heading"
                fontSize="5xl"
                color="blue"
                fontWeight="bolder"
                wordBreak="normal"
                textAlign="center"
                py="0.5em"
              >
                IDR {info[2]}
              </Text>
              <Text>
                *Registration fee will be slighty different for international
                students
              </Text>
              <Text
                w="100%"
                fontFamily="heading"
                fontSize="xl"
                color="blue"
                fontWeight="bolder"
                wordBreak="normal"
                textAlign="center"
                mt="0.5em"
              >
                {info[3]}
              </Text>
              <Button
                fontSize="lg"
                w="min(90%,20em)"
                mt="2em"
                color="blue"
                border="0.5px solid black"
                onClick={() => router.push("case-competition-registration")}
                isDisabled={index == 1}
              >
                <Text mr="1em">
                  {index == 0 ? "Register" : "Not Opened Yet"}
                </Text>{" "}
                {index == 0 && <MdArrowForward size="1.5em" />}
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </PublicLayout>
  );
}
