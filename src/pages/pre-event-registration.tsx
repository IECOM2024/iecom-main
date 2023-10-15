import { Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { EventRegistration } from "~/components/EventRegistration";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ force: true });

export default function EventRegistrationPage() {
  const { data: session } = useSession();

  return (
    <AuthorizedRoleLayout session={session}>
      <EventRegistration />
    </AuthorizedRoleLayout>
  );
}
