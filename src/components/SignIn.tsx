import { api } from "~/utils/api";
import { FormEvent, FormEventHandler, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PasswordInput } from "~/utils/elements/PasswordInput";

interface SignInProps {
  csrfToken: string;
}

export const SignIn = ({ csrfToken }: SignInProps) => {
  const toaster = useToaster();
  const router = useRouter();

  const { data: session } = useSession();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignIn = (email: string, password: string) => {
    toaster(
      signIn("credentials", { email, password, redirect: true, csrfToken })
    );
  };

  const googleSignIn = () => {
    signIn("google", { redirect: true, csrfToken })
    console.log(csrfToken)
  };

  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    credentialSignIn(emailInput, passwordInput);
  };

  return (
    <Flex justifyContent="center" my="5em">
      <Flex
        flexDirection="column"
        border="1px solid black"
        borderRadius="10px"
        p="1em"
        w="min(30em,95%)"
      >
        <Text textAlign="center" fontSize="5xl" color="blue" fontWeight="bold">
          Sign In
        </Text>
        <form onSubmit={onSignIn}>
          <FormControl>
            <Input
              mt="1em"
              w="100%"
              value={emailInput}
              onChange={emailChangeHandler}
              placeholder="Email"
              id="EmailInput"
            />

            <PasswordInput
              mt="1em"
              w="100%"
              value={passwordInput}
              type="password"
              onChange={passwordChangeHandler}
              placeholder="Password"
            />

            <Flex w="100%" flexDir="column" mt="1em">
              <Button type="submit" w="50%" m="auto">
                Sign In with Email
              </Button>
              <Button mx="auto" mt="1em" w="50%" onClick={googleSignIn}>
                <Image src="google_logo.ico" alt="" w="1em" mr="1em"/>
                Sign In with Google
              </Button>
            </Flex>

            <Flex pos="relative" p="1em" alignItems="center">
              <Divider color="black" />
              <AbsoluteCenter
                fontSize="xl"
                w="2em"
                textAlign="center"
              >
                or
              </AbsoluteCenter>
            </Flex>
            <Flex w="100%">
              <Button onClick={() => router.push("/signup")} w="50%" m="auto">
                Sign Up
              </Button>
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};
