import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
  Input,
} from "@chakra-ui/react";
import {
  EssayCompetitionRegistrationData,
  EssaySubmission,
  RegistrationStatus,
  User,
} from "@prisma/client";
import { MdEdit, MdLink, MdMessage } from "react-icons/md";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { FolderEnum } from "~/utils/file";
import { useState } from "react";
import { useRouter } from "next/router";

interface ObjectListRowProps {
  objectContent: EssaySubmission & {
    user: User;
    essayCompetitionRegistrationData: EssayCompetitionRegistrationData;
  };
  num: number;
}

export const EssaySubmisRow = ({ objectContent, num }: ObjectListRowProps) => {
  const router = useRouter();
  const toast = useToast();

  const {
    essayCompetitionRegistrationData: { name, email, institution },
    essaySubmissionLink: fileUploadLink,
  } = objectContent;

  const downloadFiles = () => {
    if (fileUploadLink) {
      router.push(fileUploadLink);
    }
  }

  return (
    <Tr>
      <Td>{num}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{institution}</Td>
      <Td>
        {fileUploadLink ? (
          <Button onClick={downloadFiles}>Download</Button>
        ) : (
          <Text fontStyle="italic">No File Uploaded</Text>
        )}
      </Td>
    </Tr>
  );
};
