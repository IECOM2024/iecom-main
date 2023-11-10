import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsMobile } from "~/utils/hooks/useIsMobile";

const NEWS: NewsPanelProps[] = [
  {
    title: "Case Competition",
    imgUrl: "/iecom-docs/iecom-docs-1.webp",
    linkTo: "/case-competition",
  },
  {
    title: "Essay Competition",
    imgUrl: "/essay-paper.webp",
    linkTo: "/essay-competition",
  },
  {
    title: "Seminar & Workshop",
    imgUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    linkTo: "pre-event#seminar-and-workshop",
  },
];

export const NewsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 2000);
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="min(90vw,60em)" bg="whiteCream">
        <ModalHeader>WHAT'S ON IECOM</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            w="100%"
            justifyContent={"space-around"}
            flexDir={isMobile ? "column" : "row"}
            gap={isMobile ? "1em" : undefined}
          >
            {NEWS.map((e, i) => {
              return <NewsPanel {...e} key={i} />;
            })}
          </Flex>
        </ModalBody>
        <ModalFooter h="3em">
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface NewsPanelProps {
  title: string;
  imgUrl?: string;
  linkTo: string;
}
const NewsPanel = ({ title, imgUrl, linkTo }: NewsPanelProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w={isMobile ? "100%" : "30%"}
      h="18em"
      borderRadius="5px"
      boxShadow="4px 4px 8px black"
      pos="relative"
      _hover={{
        boxShadow: "4px 4px 8px rgba(100,100,200,0.6)",
        cursor: "pointer",
      }}
      bgImage={imgUrl}
      bgSize="auto 100%"
      bgRepeat="no-repeat"
      onClick={() => router.push(linkTo)}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      overflowY="hidden"
    >
      <Text
        w="100%"
        h="5em"
        pos="absolute"
        top={isMobile ? "60%" : isOpen ? "60%" : "110%"}
        fontSize="3xl"
        fontWeight="bold"
        color="whiteCream"
        textAlign="center"
        transition="0.2s ease-in"
        bg="linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))"
        pt="0.5em"
        px="0.5em"
      >
        {title}
      </Text>
    </Flex>
  );
};
