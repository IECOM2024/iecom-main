import { Button, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { EssayRegistAdministration } from "~/components/EssayCompetitionAdmin";
import { AdminRoleLayout } from "~/components/layout/AdminRoleLayout";
import { api } from "~/utils/api";
import { useToaster } from "~/utils/hooks/useToaster";

export default function RegistAdminPage() {
  return (
    <AdminRoleLayout>
      <EssayRegistAdministration />
    </AdminRoleLayout>
  );
}
