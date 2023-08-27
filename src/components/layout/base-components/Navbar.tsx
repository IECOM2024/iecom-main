import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    >
      <Text onClick={() => router.push("/")} fontSize="xl" fontWeight="bold" cursor="pointer"> IECOM 2024 </Text>
      <Flex w="min(35em,40%)" justifyContent="space-around" alignItems="center">
        {!isMobile && (
          <>
            <Button variant="no-border" onClick={() => router.push("/event")}>
              Event
            </Button>
            <Button
              variant="no-border"
              onClick={() => router.push("/competition")}
            >
              Competition
            </Button>
          </>
        )}
        {!isMobile ? (
          !!session ? (
            <Menu>
              <MenuButton>
                {session.user.name
                  ? `Hello, ${session.user.name.split(" ")[0]}`
                  : "Hello"}
              </MenuButton>
              <MenuList border="1px solid gray">
                <Flex flexDirection="column" alignItems="center" px="0.7em" py="0.5em">
                  {
                    session.user.role === "ADMIN" ? (
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
                    )
                  }
                  <Box bg="black" w="80%" m="auto" h="1px" my="1em"/>
                  <Button onClick={() => router.push("/profile")}>
                    Profile
                  </Button>
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
          )
        ) : !!session ? (
          <Menu>
            <MenuButton>
              {session.user.name
                ? `Hello, ${session.user.name.split(" ")[0]}`
                : "Hello"}
            </MenuButton>
            <MenuList>
              <Flex flexDirection="column" alignItems="center" px="0.7em" py="0.5em">
                <Button
                  variant="no-border"
                  onClick={() => router.push("/event")}
                >
                  Event
                </Button>
                <Button
                  variant="no-border"
                  onClick={() => router.push("/competition")}
                >
                  Competition
                </Button>
                <Divider color="black" />
                <Button onClick={() => router.push("/profile")}>Profile</Button>
                <Button onClick={() => router.push("/api/auth/signout")}>
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
      </Flex>
    </Flex>
  );
};
