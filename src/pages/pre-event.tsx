import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default function EventPage() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <PublicLayout>
      <Image
        src="preevent-1.webp"
        alt=""
        position="absolute"
        zIndex="-1"
      ></Image>
      <Flex flexDir="column" marginLeft = "10vw">
        <Text w="100%" fontSize="7xl" fontWeight = "bold" color="blue" marginTop="30vh" >
          Pre-event
        </Text>
        <Text fontWeight ="Regular" color = "blue" mr = "60vh" fontSize="26" fontFamily="Inter">
          Lorem ipsum dolor sit amet consectetur. Eget ultrices lobortis 
          consequat morbi sodales sollicitudin tristique faucibus. Nunc 
          commodo mi dolor ipsum odio in cras. Eu posuere libero tristique 
          praesent nunc sit mollis. Gravida mi vulputate massa in mauris 
          tortor bibendum tincidunt.
        </Text>
        <Flex w="100%">
          {session?.user.role === "ADMIN" ? (
            <Button onClick={() => router.push("event-administration")}>
              Manage Event
            </Button>
          ) : (
            <Button onClick={() => router.push("event-registration")} mt = "5vh" fontFamily ="alsans" color = "blue" mb = "20vh" width = "15%">
              Register Now!
            </Button>
          )}
        </Flex>
      </Flex>
    </PublicLayout>
  );
}
