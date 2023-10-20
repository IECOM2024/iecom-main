import { useSession } from "next-auth/react";
import { AdminRoleLayout } from "~/components/layout/AdminRoleLayout";
import { Flex, Table, TableContainer, Td, Thead, Tr } from "@chakra-ui/react";

export default function EventAdministrationPage() {
  const { data: session } = useSession();


  if (!session || session.user.role !== "ADMIN") return <></>;

  return (
    <AdminRoleLayout session={session}>
      
    </AdminRoleLayout>
  );
}
