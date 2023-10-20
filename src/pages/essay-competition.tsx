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
import { ComingSoon } from "~/components/ComingSoon";
import { Timeline, timelineContent } from "~/components/common/Timeline";
import { PublicLayout } from "~/components/layout/PublicLayout";
import {
  FadeIn,
  Slide,
  StaggeredPops,
  VisGrow,
} from "~/utils/animation/entrance-animation";

const COMP_DESCRIPTION =
  "Essay competititon is one of the competitions in IECOM 2024. Every participant that wants to take part in this competition has to make an essay according to the topic that has been decided. Participants who pass this stage will present their essays in front of the judges that are experts in the field. This stage will measure the sensitivity to global issues and the communication skills of the participants.";
const COMP_REQUIREMENTS = [
  "All essay participants must be active undergraduate or diploma students from local or international universities/institutions",
  "Each participant competes individually",
  "The top 5 participants who pass the first stage (essay judging) will present their essay in front of the judges that experts in the field",
  "Participants who are selected to present their essays must create a pitch deck and participate in student summit event on the offline pitching day in Bandung",
  "Submission must be fresh and has never been submitted in previous competition or published in online media. Participants are prohibited from committing acts of plagiarism.",
];
const PRIZE: [number, string][] = [
  [0.8, "USD 200"],
  [1, "USD 300"],
  [0.6, "USD 100"],
];
const REGIST_INFO: [string, number, number, string][] = [
  [
    "Early Bird Registration",
    4,
    60000,
    "Will be opened until October, 31th 2023",
  ],
  ["Normal Registration", 6, 80000, "Will be open on November, 1st 2023"],
];

const TIMELINE_CONTENT: timelineContent[] = [
  ["Early Bird Registration", "21 Oct - 1 Nov 2023"],
  ["Normal Registration", "2 - 20 November 2023"],
  ["Last Submission", "1 December 2023"],
  ["Essay Judging", "2 - 23 December 2023"],
  ["Finalist Announcement", "4 January2023"],
  ["Pitching Preparation", "10 - 25 January 2023"],
  ["Pitching Session", "29 January 2023"],
].map((content) => ({
  dateStr: content[1] ?? "",
  title: content[0] ?? "",
}));

export default function MainCompetitionPage() {
  const isMobile = useMediaQuery("(max-width: 600px)")[0];
  const router = useRouter();

  return (
    <PublicLayout>
      <Flex flexDir="column" w="100%" pos="relative">
        {/* Main Description Group*/}

        <Flex
          bgImage="main-comp-1.webp"
          bgSize={{ base: "auto 100%", lg: "100% auto" }}
        >
          <Slide from="left">
            <Flex flexDir="column" w="80%" mt="12rem" ml="4.5em">
              <Text
                w="100%"
                fontSize="6xl"
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Essay Competition
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
                onClick={() => router.push("essay-competition-guidebook.pdf")}
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
              Participant Provisions & Essay Rules
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
                        {index == 0 ? (
                          <Text>
                            1<Text as="sup">st</Text>
                          </Text>
                        ) : index == 1 ? (
                          <Text>
                            2<Text as="sup">nd</Text>
                          </Text>
                        ) : (
                          <Text>
                            3<Text as="sup">rd</Text>
                          </Text>
                        )}
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
                        {index == 0 ? (
                          <Text>
                            1<Text as="sup">st</Text>
                          </Text>
                        ) : index == 1 ? (
                          <Text>
                            2<Text as="sup">nd</Text>
                          </Text>
                        ) : (
                          <Text>
                            3<Text as="sup">rd</Text>
                          </Text>
                        )}
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

            <Timeline timelineContent={TIMELINE_CONTENT} />
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
                className="blue-stroke-1px"
                py="1em"
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
                className="blue-stroke-1px"
                py="1em"
              >
                IDR {info[2]}
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
                onClick={() => router.push("essay-competition-registration")}
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
