import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { use, useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { PublicLayout } from "~/components/layout/PublicLayout";
import {
  OpacityAnim,
  Slide,
  StepPops,
} from "~/utils/animation/entrance-animation";

const COMP_DESCRIPTION =
  "IECOM’s main competition is designed for those who are thirsty for a challenge! Through this four-stage competition, each team of three will be challenged to implement Industrial Engineering body of knowledge to provide an answer for real life problems. Every team will have a chance to enhance their critical thinking and problem solving skills to make the most of the possibilities that exist from the cases.";
const COMP_REQUIREMENTS = [
  "Participants must be proficient in English.",
  "Students from any universities in Southeast Asia are welcome to apply.",
  "Participants must be an active university student, proven by a valid student identity card.",
  "Each university or institute is allowed to register any number of teams for Online Selection.",
  "Participants must form a team of 3 individuals from the same universities and all members must be enrolled as a student of Industrial Engineering or other relevant major.",
];
const PRIZE: [number, string][] = [
  [0.8, "USD 1000"],
  [1, "USD 2500"],
  [0.6, "USD 500"],
];
const REGIST_INFO: [string, number, number, string][] = [
  [
    "Early Bird Registration",
    15,
    200000,
    "Will be opened until 10th of November 2023",
  ],
  [
    "Normal Registration",
    20,
    250000,
    "Will be opened until 20th of November 2023",
  ],
];

export default function MainCompetitionPage() {
  const isMobile = useMediaQuery("(max-width: 600px)")[0];

  return (
    <PublicLayout>
      <Flex flexDir="column" w="100%" pos="relative">
        {/* Main Description Group*/}

        <Flex bgImage="main-comp-1.webp">
          <Slide from="left">
            <Flex flexDir="column" w="80%" mt="12rem" ml="4.5em">
              <Text
                w="100%"
                fontSize="6xl"
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Main Competition
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
              <Button w="8em" h="2em" mt="4em" mb="6em" fontSize="2xl">
                Learn More
              </Button>
            </Flex>
          </Slide>
        </Flex>

        {/* Grand Theme Group*/}
        <OpacityAnim time={5}>
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
        </OpacityAnim>

        {/* Requirements  Group*/}
        <OpacityAnim time={5}>
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
            <StepPops>
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
            </StepPops>
          </Box>
        </OpacityAnim>

        {/* Prize Group*/}
        <OpacityAnim time={5}>
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
                      key={index}
                      w="90%"
                      alignItems="center"
                      my="1em"
                      bg="whiteCream"
                      justifyContent="space-between"
                      boxShadow="0 4px 4px rgba(0,0,0,0.25)"
                      h="6em"
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
                  <Flex
                    key={index}
                    w="30%"
                    flexDir="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    my="1em"
                    bg="whiteCream"
                    boxShadow="0 4px 4px rgba(0,0,0,0.25)"
                    h={`${17 * prize[0]}em`}
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
              })}
            </Flex>
          </Box>
        </OpacityAnim>

        {/* Timeline Group*/}
        <OpacityAnim time={5}>
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
              Timeline
            </Text>
            <Text w="100%" >
              FIXIN DULU TIMELINE colek @compe
            </Text>
          </Box>
        </OpacityAnim>

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
                color="white"
                fontWeight="bolder"
                wordBreak="normal"
                textAlign="center"
                className="blue-stroke-1px"
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
                color="white"
                fontWeight="bolder"
                wordBreak="normal"
                textAlign="center"
                className="blue-stroke-1px"
              >
                RP. {info[2]}
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
              >
                <Text mr="1em">Register</Text> <MdArrowForward size="1.5em" />
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </PublicLayout>
  );
}
