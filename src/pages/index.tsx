import { Flex, Text } from "@chakra-ui/react";
import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <PublicLayout>
        <Flex flexDir="column" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" textAlign="center" mt="4rem">
            IECOM 2024
          </Text>
        </Flex>
      </PublicLayout>
    </>
  );
}
