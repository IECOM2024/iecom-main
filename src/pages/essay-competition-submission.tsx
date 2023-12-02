import {
  Button,
  Flex,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ContentCard } from "~/components/common/ContentCard";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { Loading } from "~/components/common/Loading";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import { api } from "~/utils/api";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useUploader } from "~/utils/hooks/useUploader";

const EssaySubmissionPageComponent = () => {
  const { uploader } = useUploader();
  const router = useRouter();

  const essaySubmisQuery =
    api.essaySubmis.participantGetSubmissionData.useQuery();
  const essaySubmis = essaySubmisQuery.data;
  const essaySubmisSaveMutation =
    api.essaySubmis.participantUpdateSubmissionData.useMutation();

  const fileStateArr = useState<File | null | undefined>();

  const uploadFile = (file: File) => {
    if (!essaySubmis) return;
    const filename = `${
      essaySubmis?.essayCompetitionRegistrationData.name ?? "NoName"
    }-${
      essaySubmis?.id.length > 3
        ? essaySubmis.id.slice(
            essaySubmis.id.length - 3,
            essaySubmis?.id.length
          )
        : ""
    }.pdf`;

    uploader(
      filename,
      FolderEnum.ESSAY_COMP_SUBMISSION,
      AllowableFileTypeEnum.PDF,
      file
    ).then((res) => {
      essaySubmisSaveMutation.mutate({
        id: essaySubmis.id,
        fileUploadLink: res?.url,
      });
    });
  };

  if (essaySubmisQuery.isLoading) return <Loading />;

  if (!essaySubmisQuery.isLoading && !essaySubmis) {
    return (
      <ContentCard pt="2em">
        <Text color="blue" fontSize="xl" mx="auto" fontWeight="bold">
          Sorry, you haven't registered for this competition
        </Text>
        <Flex
          justifyContent="center"
          w="100%"
          flexDir={{ base: "column", lg: "row" }}
          gap="1em"
        >
          <Button
            bg="blue"
            color="white"
            w={{ base: "100%", lg: "8em" }}
            onClick={() => router.push("/essay-competition-registration")}
          >
            Register
          </Button>
          <Button
            bg="white"
            color="black"
            w={{ base: "100%", lg: "8em" }}
            onClick={() => router.push("/essay-competition")}
          >
            Competition Info
          </Button>
        </Flex>
      </ContentCard>
    );
  }

  return (
    <ContentCard>
      <Text
        fontSize="3xl"
        color="blue"
        fontFamily="body"
        textAlign="center"
        mt="1em"
        fontWeight="bold"
      >
        Personal Information
      </Text>
      <TableContainer w="100%">
        <Table>
          <Tr>
            <Td fontSize="xl">Name</Td>
            <Td>:</Td>
            <Td fontSize="xl" color="blue">
              {essaySubmis?.essayCompetitionRegistrationData.name}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="xl">Email</Td>
            <Td>:</Td>
            <Td fontSize="xl" color="blue">
              {essaySubmis?.essayCompetitionRegistrationData.email}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="xl">Phone Number</Td>
            <Td>:</Td>
            <Td fontSize="xl" color="blue">
              {essaySubmis?.essayCompetitionRegistrationData.phoneNumber}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="xl">Institution</Td>
            <Td>:</Td>
            <Td fontSize="xl" color="blue">
              {essaySubmis?.essayCompetitionRegistrationData.institution}
            </Td>
          </Tr>
        </Table>
      </TableContainer>

      <Text
        fontSize="3xl"
        color="blue"
        fontFamily="body"
        textAlign="center"
        mt="1em"
        fontWeight="bold"
      >
        Essay Submission
      </Text>
      <Text fontSize="2xl" color="brown.3" fontWeight="bold">
        Submission Rules :
      </Text>
      <OrderedList color="blue">
        <ListItem>Essay must be in a PDF format</ListItem>
        <ListItem>The file size must be less than 10MB</ListItem>
      </OrderedList>
      <Flex w="100%" justifyContent="center" mt="1em">
        <FileInput
          fileStateArr={fileStateArr}
          imgUrl={essaySubmis?.essaySubmissionLink ?? undefined}
          allowed={[AllowableFileTypeEnum.PDF]}
        />
      </Flex>
      {fileStateArr[0] && (
        <Button
          bg="blue"
          color="white"
          onClick={() => {
            if (fileStateArr[0]) uploadFile(fileStateArr[0]);
          }}
          mt="1em"
        >
          {essaySubmis?.essaySubmissionLink ? "Update Submission" : "Submit"}
        </Button>
      )}
      {essaySubmis?.lastSubmissionTime && (
        <Text
          fontSize="xl"
          color="blue"
          fontFamily="body"
          textAlign="center"
          mt="1em"
        >
          Last Submission Time:{" "}
          {essaySubmis.lastSubmissionTime.toLocaleTimeString()}
        </Text>
      )}
    </ContentCard>
  );
};

export default function EssaySubmissionPage() {
  const { data: session } = useSession();
  return (
    <AuthorizedRoleLayout session={session}>
      <EssaySubmissionPageComponent />
    </AuthorizedRoleLayout>
  );
}
