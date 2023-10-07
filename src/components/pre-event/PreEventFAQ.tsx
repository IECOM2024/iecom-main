import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Slide } from "~/utils/animation/entrance-animation";

const FAQCONTENT: {
  question: string;
  answer: string;
}[] = [
  {
    question: "What is IECOM Preevent?",
    answer: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    question: "What is MTI?",
    answer: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export const PreEventFAQ = () => {
  return (
    <Slide from="right">
      <Flex
        flexDir="column"
        w="100%"
        mt="7rem"
        pb={{ base: "2rem", md: "14rem" }}
      >
        <Text
          fontSize="5xl"
          color="whiteCream"
          textAlign="center"
          fontWeight="bold"
        >
          Frequently Asked Questions
        </Text>

        <Accordion allowToggle>
          {FAQCONTENT.map((faq, index) => (
            <AccordionItem
              key={index}
              mt="1em"
              w="min(60em, 90%)"
              borderRadius="10px"
              border="1px solid cream"
              bg="cream"
              mx="auto"
              color="blue"
            >
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontSize="xl">
                      {faq.question}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize="xl">
                  {faq.answer}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Slide>
  );
};
