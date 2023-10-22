import { api } from "~/utils/api";
import { useState } from "react";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { PasswordInput } from "~/utils/elements/PasswordInput";
import { router } from "@trpc/server";
import { useRouter } from "next/router";

interface SignUpProps {
  csrfToken: string;
}

export const SignUp = ({ csrfToken }: SignUpProps) => {
  const toast = useToast();
  const toaster = useToaster();
  const router = useRouter();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const confirmPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordInput(e.target.value);
  };

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignUp = (email: string, password: string, name: string) => {
    // TODO: Kasih CSRF Validation & reCAPTCHA
    toaster(
      createUserMutation
        .mutateAsync({ email, password, name })
        .then(() => router.replace("/"))
    );
  };

  const credentialButtonClickHandler = () => {
    if (emailInput === "") {
      toast({
        title: "Email cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput === "") {
      toast({
        title: "Password cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!emailInput.includes("@")) {
      toast({
        title: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput.length < 8) {
      toast({
        title: "Password must be at least 8 characters long",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    credentialSignUp(emailInput, passwordInput, nameInput);
  };

  return (
    <Flex justifyContent="center" mt="2em" mb="40vh">
      <Flex
        flexDirection="column"
        border="1px solid black"
        borderRadius="10px"
        p="1em"
        w="min(30em,95%)"
      >
        <Text textAlign="center">Sign Up</Text>
        <Input
          mt="1em"
          w="100%"
          value={nameInput}
          onChange={nameChangeHandler}
          placeholder="Name"
        />
        <Input
          mt="1em"
          w="100%"
          value={emailInput}
          onChange={emailChangeHandler}
          placeholder="Email"
        />
        <PasswordInput
          mt="1em"
          w="100%"
          value={passwordInput}
          onChange={passwordChangeHandler}
          placeholder="Password"
        />
        <PasswordInput
          mt="1em"
          w="100%"
          value={confirmPasswordInput}
          onChange={confirmPasswordChangeHandler}
          placeholder="Confirm Password"
        />

        <Button
          onClick={credentialButtonClickHandler}
          w="50%"
          m="auto"
          mt="1em"
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};
