import { Flex, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { EventRegistration } from "~/components/EventRegistration";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ force: true });

export default function EventRegistrationPage() {
  const { data: session } = useSession();
  const router = useRouter()
  console.log(
    router.query
  )

  return (
    <AuthorizedRoleLayout session={session}>
      <EventRegistration eventType={router.query.eventType as string}/>
    </AuthorizedRoleLayout>
  );
}
