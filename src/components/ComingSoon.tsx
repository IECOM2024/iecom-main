import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StaggeredPops } from "~/utils/animation/entrance-animation";
import { arrayRandomPicker } from "~/utils/functions/array-random-picker";

interface ComingSoonProps {
  something?: string;
}

const IECOM_DOCS: string[] = [
  "iecom-docs/iecom-docs-1.webp",
  "iecom-docs/iecom-docs-2.webp",
  "iecom-docs/iecom-docs-3.webp",
  "iecom-docs/iecom-docs-4.webp",
  "iecom-docs/iecom-docs-5.webp",
  "iecom-docs/iecom-docs-6.webp",
  "iecom-docs/iecom-docs-7.webp",
  "iecom-docs/iecom-docs-8.webp",
];

export const ComingSoon = ({ something }: ComingSoonProps) => {
  const router = useRouter();

  return (
    <Flex flexDir="column" mt="2em">
      <Text
        fontFamily="heading"
        fontSize="5xl"
        fontWeight="bold"
        textAlign="center"
        color="blue"
        w="100%"
      >{`${something ?? "This Page"} Is Coming Soon`}</Text>
      <Text
        fontFamily="heading"
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        color="brown.3"
        mt="1em"
        w="100%"
      >
        Here are some of last year's IECOM documentation
      </Text>
      <Flex
        w="min(60em, 90%)"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="2em"
        mt="1em"
        mx="auto"
      >
        <StaggeredPops delay={0.4} duration={0.5}>
          {arrayRandomPicker(IECOM_DOCS, 3).map((e, i) => (
            <Image
              src={e}
              key={i}
              alt={e}
              height="16em"
              w="20em"
              borderRadius="5px"
              boxShadow="4px 4px 4px rgba(128,128,128,0.6)"
            />
          ))}
        </StaggeredPops>
      </Flex>
      <Button w="8em" onClick={() => router.push("/")} mx="auto" mt="3em">
        Home Page
      </Button>
    </Flex>
  );
};
