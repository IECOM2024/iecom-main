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
    question: "Who can join IECOM's Pre-event?",
    answer:
      "University students, High school students, or any of you that find the event interesting.",
  },

  {
    question: "How can i join IECOM's Pre-event?",
    answer:
      "You can register as a participant by applying yourself through this website. First, you need to create an IECOM account then click 'Register' button on the event you wish to join. Kindly follow our social media page or our website to keep updated!",
  },
  {
    question: "Can i join both of the events?",
    answer:
      "Yes, you can join both of the events, as long as there are available seats.",
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

        <Accordion allowMultiple allowToggle>
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
                    <Text fontSize="xl" fontWeight="bold">{faq.question}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize="xl">{faq.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Slide>
  );
};
