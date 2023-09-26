import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdArrowDropDown, MdReorder } from "react-icons/md";

interface NavbarProps {
  type?: "signin" | "signup";
}

export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const isMobile = useMediaQuery("(max-width: 600px)")[0];

  return (
    <Flex
      justifyContent="space-between"
      px="2em"
      py="0.5em"
      alignItems="center"
      fontFamily="heading"
    >
      <Flex
        onClick={() => router.push("/")}
        cursor="pointer"
        w="10em"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src="main-icon.webp" alt="" w="2.5em" />
        <Text fontSize="2xl" fontWeight="900" color="blue">
          IECOM
        </Text>
      </Flex>
      <Flex w="min(35em,60%)" justifyContent="space-around" alignItems="center">
        {!isMobile ? (
          <ButtonGroupDesktop session={session} router={router} type={type} />
        ) : (
          <ButtonGroupMobile session={session} router={router} type={type} />
        )}
      </Flex>
    </Flex>
  );
};

interface ButtonGroupProps {
  session: ReturnType<typeof useSession>["data"];
  router: ReturnType<typeof useRouter>;
  type?: "signin" | "signup";
}

const ButtonGroupDesktop = ({ session, router, type }: ButtonGroupProps) => {
  
  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="no-border">
          Event
        </MenuButton>
        <MenuList
          border="1px solid black"
          borderRadius="10px"
          flexDir="column"
          display="flex"
        >
          <Button variant="no-border" onClick={() => router.push("/pre-event")}>
            Pre-Event
          </Button>
          <Button
            variant="no-border"
            onClick={() => router.push("/student-summit")}
          >
            Student Summit
          </Button>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} variant="no-border">
          Competition
        </MenuButton>
        <MenuList
          border="1px solid black"
          borderRadius="10px"
          flexDir="column"
          display="flex"
        >
          <Button variant="no-border" onClick={() => router.push("/essay-competition")}>
            Essay Competition
          </Button>
          <Button
            variant="no-border"
            onClick={() => router.push("/ie-competition")}
          >
            IE Competition
          </Button>
        </MenuList>
      </Menu>
      {!!session ? (
        <Menu>
          <MenuButton>
            {session.user.name
              ? `Hello, ${session.user.name.split(" ")[0]}`
              : "Hello"}
          </MenuButton>
          <MenuList border="1px solid gray">
            <Flex
              flexDirection="column"
              alignItems="center"
              px="0.7em"
              py="0.5em"
            >
              {session.user.role === "ADMIN" ? (
                <Button
                  variant="no-border"
                  onClick={() => router.push("/event-administration")}
                >
                  Manage Event
                </Button>
              ) : (
                <Button
                  variant="no-border"
                  onClick={() => router.push("/event-registration")}
                >
                  Register Event
                </Button>
              )}
              <Box bg="black" w="80%" m="auto" h="1px" my="1em" />
              <Button onClick={() => router.push("/profile")}>Profile</Button>
              <Button onClick={() => router.push("/api/auth/signout")} mt="1em">
                Sign Out
              </Button>
            </Flex>
          </MenuList>
        </Menu>
      ) : type !== "signin" ? (
        <Button onClick={() => signIn()}> Sign In </Button>
      ) : (
        <Box />
      )}
    </>
  );
};

const ButtonGroupMobile = ({ session, router, type }: ButtonGroupProps) => {
  const eventDisclosure = useDisclosure();
  const competitionDisclosure = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant="no-border"
          display="flex"
          justifyContent="right"
        >
          <MdReorder size="1.5em" />
        </MenuButton>
        <MenuList display="flex" flexDir="column" w="100vw">
          <Button variant="no-border" onClick={eventDisclosure.onToggle}>
            Event
            <MdArrowDropDown size="1.5em" />
          </Button>
          {eventDisclosure.isOpen && (
            <>
              <Button variant="no-border" onClick={() => router.push("/pre-event")}>
                Pre-Event
              </Button>
              <Button
                variant="no-border"
                onClick={() => router.push("/student-summit")}
              >
                Student Summit
              </Button>
            </>
          )}
          <Button variant="no-border" onClick={competitionDisclosure.onToggle}>
            Competition
            <MdArrowDropDown size="1.5em" />
          </Button>
          {competitionDisclosure.isOpen && (
            <>
              <Button
                variant="no-border"
                onClick={() => router.push("/essay-competition")}
              >
                Essay Competition
              </Button>
              <Button
                variant="no-border"
                onClick={() => router.push("/ie-competition")}
              >
                IE Competition
              </Button>
            </>
          )}
          
            <Box h="1px" w="90%" m="auto" my="1em" bg="black"/>

          {!!session ? (
            <>
              <Button onClick={() => router.push("/profile")}>Profile</Button>
              <Button onClick={() => router.push("/api/auth/signout")} mt="1em">
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/signin")}>Sign In</Button>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
