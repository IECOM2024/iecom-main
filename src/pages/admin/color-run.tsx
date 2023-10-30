import { Button, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { ColorRunAdministration } from "~/components/EventAdministration/ColorRunAdministration";
import { AdminRoleLayout } from "~/components/layout/AdminRoleLayout";
import { api } from "~/utils/api";
import { useToaster } from "~/utils/hooks/useToaster";

export default function RegistAdminPage() {
  return (
    <AdminRoleLayout>
      <ColorRunAdministration />
    </AdminRoleLayout>
  );
}
