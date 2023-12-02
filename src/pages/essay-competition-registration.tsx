import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { EventRegistration } from "~/components/EventRegistration";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import {
  useForm,
  type Resolver,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import {
  EssayCompetitionRegistration,
  FormValues,
} from "~/components/EssayCompetitionRegistration";
import { Loading } from "~/components/common/Loading";
import { useToaster } from "~/utils/hooks/useToaster";
import { useUploader } from "~/utils/hooks/useUploader";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { RegistrationStatus } from "@prisma/client";

function EssayCompetitiontRegistrationPageComponent() {
  const toaster = useToaster();
  const router = useRouter();
  const { uploader } = useUploader();
  const { downloader } = useDownloader();
  const [initialImgUrl, setInitialImgUrl] = useState<string | undefined>(); // For Proof of Payment

  const essayRegistQuery =
    api.essayRegist.participantGetEssayRegistData.useQuery();
  const essayRegist = essayRegistQuery.data;

  const essayRegistSaveMutation =
    api.essayRegist.participantSaveEssayRegistData.useMutation();
  const essayRegistSubmitMutation =
    api.essayRegist.participantSubmitEssayRegistData.useMutation();
  const essayRegistDeleteMutation =
    api.essayRegist.participantDeleteEssayRegistData.useMutation();

  useEffect(() => {
    if (!essayRegist || !essayRegist.isFilePaymentUploaded) {
      return;
    }

    downloader({
      folder: FolderEnum.ESSAY_COMP_FILES,
      filename: `${essayRegist.id}.zip`,
    }).then(({ url }) => setInitialImgUrl(url));
  }, [essayRegist, downloader]);

  const submitForm = async (data: FormValues) => {
    toaster(
      essayRegistSaveMutation
        .mutateAsync({
          name: data.name ?? undefined,
          email: data.email ?? undefined,
          phoneNumber: data.phoneNumber ?? undefined,
          institution: data.institution ?? undefined,
          major: data.major ?? undefined,
          batch: data.batch ?? undefined,
          postLink: data.postLink ?? undefined,
          twibbonLink: data.twibbonLink ?? undefined,
          whereDidYouKnowThisCompetitionInformation:
            data.whereDidYouKnowThisCompetitionInformation ?? undefined,
        })
        .then(() => essayRegistSubmitMutation.mutateAsync())
        .then(() => {
          router.push("/essay-competition-registration");
        })
    );
  };

  const saveForm = async (data: FormValues) => {
    toaster(
      essayRegistSaveMutation.mutateAsync({
        name: data.name ?? undefined,
        email: data.email ?? undefined,
        phoneNumber: data.phoneNumber ?? undefined,
        institution: data.institution ?? undefined,
        major: data.major ?? undefined,
        batch: data.batch ?? undefined,
        postLink: data.postLink ?? undefined,
        twibbonLink: data.twibbonLink ?? undefined,
        whereDidYouKnowThisCompetitionInformation:
          data.whereDidYouKnowThisCompetitionInformation ?? undefined,
      })
    );
  };

  const uploadFile = async (file: File, filename: string) => {
    if (!essayRegist) return;
    await uploader(
      `${filename}-${
        essayRegist.id.length >= 3
          ? essayRegist.id.slice(
              essayRegist.id.length - 3,
              essayRegist.id.length
            )
          : ""
      }.zip`,
      FolderEnum.ESSAY_COMP_FILES,
      AllowableFileTypeEnum.ZIP,
      file
    ).then((res) => {
      essayRegistSaveMutation.mutateAsync({
        fileUploadLink: res?.url,
      });
    }),
      {
        thenFn: () => {
          essayRegistQuery.refetch();
        },
      };
  };

  const cancelRegistration = async () => {
    toaster(essayRegistDeleteMutation.mutateAsync());
  };

  if (essayRegistQuery.isLoading) return <Loading />;

  if (essayRegist?.status === RegistrationStatus.SUBMITTED_CONFIRMED) {
    return (
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="2em"
      >
        <Text fontSize="2xl" fontWeight="bold" color="blue">
          Your registration has been confirmed, Please wait for the next
          information
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="blue">
          Thank you for participating!
        </Text>
        <Button
          mt="1em"
          colorScheme="blue"
          onClick={() => router.push("/essay-competition-submission")}
          w="min(95%, 1000px)"
        >
          Submit My Essay
        </Button>
      </Flex>
    );
  }

  if (essayRegist?.status === RegistrationStatus.SUBMITTED_UNCONFIRMED) {
    return (
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="2em"
        mb="80vh"
        w="min(95%, 1000px)"
        bg="whiteCream"
        p="1em"
        borderRadius="1em"
        mx="auto"
      >
        <Text fontSize="2xl" fontWeight="bold" color="blue">
          Your registration has been submitted. Our team will confirm your
          registration soon
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="blue">
          Thank you for participating!
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      color="blue"
      fontWeight="bold"
      flexDirection="column"
      alignItems="center"
      fontSize="5xl"
      py="4em"
      px="3em"
      mx="auto"
    >
      This form is closed, thank you for your attention!
    </Flex>
  );

  return (
    <EssayCompetitionRegistration
      initialFormValues={essayRegist}
      submitForm={submitForm}
      saveForm={saveForm}
      uploadFile={uploadFile}
      initialImgUrl={essayRegist?.fileUploadLink ?? undefined}
      status={essayRegist?.status ?? RegistrationStatus.FORM_FILLING}
      cancelRegistration={cancelRegistration}
    />
  );
}

// Ini gr2 kegoblokan alif yang ga bikin komponen terpisah dari page
export default function ColorRunRegistrationPage() {
  const { data: session } = useSession();
  return (
    <AuthorizedRoleLayout session={session}>
      <EssayCompetitiontRegistrationPageComponent />
    </AuthorizedRoleLayout>
  );
}
