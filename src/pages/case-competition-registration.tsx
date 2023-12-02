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
  useToast,
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
  CaseCompetitionRegistration,
  FormValues,
} from "~/components/MainCompetitionRegistration";
import { Loading } from "~/components/common/Loading";
import { useToaster } from "~/utils/hooks/useToaster";
import { useUploader } from "~/utils/hooks/useUploader";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { RegistrationStatus } from "@prisma/client";

function CaseCompetitiontRegistrationPageComponent() {
  const toaster = useToaster();
  const toast = useToast();
  const router = useRouter();
  const { uploader } = useUploader();
  const { downloader } = useDownloader();
  const [initialImgUrl, setInitialImgUrl] = useState<string | undefined>(); // For Proof of Payment

  const caseRegistQuery =
    api.caseRegist.participantGetCaseRegistData.useQuery();
  const caseRegist = caseRegistQuery.data;

  const caseRegistSaveMutation =
    api.caseRegist.participantSaveCaseRegistData.useMutation();
  const caseRegistSubmitMutation =
    api.caseRegist.participantSubmitCaseRegistData.useMutation();
  const caseRegistDeleteMutation =
    api.caseRegist.participantDeleteCaseRegistData.useMutation();
  const checkRefferalCode =
    api.caseRegist.participantCheckRefferalCode.useMutation();

  useEffect(() => {
    if (!caseRegist || !caseRegist.isFilePaymentUploaded) {
      return;
    }

    downloader({
      folder: FolderEnum.CASE_COMP_FILES,
      filename: `${caseRegist.id}.zip`,
    }).then(({ url }) => setInitialImgUrl(url));
  }, [caseRegist, downloader]);

  const submitForm = async (data: FormValues) => {
    toaster(
      caseRegistSaveMutation
        .mutateAsync({
          teamName: data.teamName ?? undefined,
          leaderName: data.leaderName ?? undefined,
          leaderEmail: data.leaderEmail ?? undefined,
          leaderPhoneNumber: data.leaderPhoneNumber ?? undefined,
          leaderInstitution: data.leaderInstitution ?? undefined,
          leaderBatch: data.leaderBatch ?? undefined,
          leaderMajor: data.leaderMajor ?? undefined,
          member1Name: data.member1Name ?? undefined,
          member1Email: data.member1Email ?? undefined,
          member1PhoneNumber: data.member1PhoneNumber ?? undefined,
          member1Institution: data.member1Institution ?? undefined,
          member1Batch: data.member1Batch ?? undefined,
          member1Major: data.member1Major ?? undefined,
          member2Name: data.member2Name ?? undefined,
          member2Email: data.member2Email ?? undefined,
          member2PhoneNumber: data.member2PhoneNumber ?? undefined,
          member2Institution: data.member2Institution ?? undefined,
          member2Batch: data.member2Batch ?? undefined,
          member2Major: data.member2Major ?? undefined,
          whereDidYouKnowThisCompetitionInformation:
            data.whereDidYouKnowThisCompetitionInformation ?? undefined,
          leaderTwibbonLink: data.leaderTwibbonLink ?? undefined,
          member1TwibbonLink: data.member1TwibbonLink ?? undefined,
          member2TwibbonLink: data.member2TwibbonLink ?? undefined,
          leaderPostLink: data.leaderPostLink ?? undefined,
          member1PostLink: data.member1PostLink ?? undefined,
          member2PostLink: data.member2PostLink ?? undefined,
          isUsingReferral: data.isUsingRefferalCode ?? undefined,
          referralCode: data.refferalCode ?? undefined,
        })
        .then(() => caseRegistSubmitMutation.mutateAsync())
        .then(() => {
          router.push("/case-competition-registration");
        })
    );
  };

  const saveForm = async (data: FormValues) => {
    toaster(
      caseRegistSaveMutation.mutateAsync({
        status: RegistrationStatus.FORM_FILLING,
        teamName: data.teamName ?? undefined,
        leaderName: data.leaderName ?? undefined,
        leaderEmail: data.leaderEmail ?? undefined,
        leaderPhoneNumber: data.leaderPhoneNumber ?? undefined,
        leaderInstitution: data.leaderInstitution ?? undefined,
        leaderBatch: data.leaderBatch ?? undefined,
        leaderMajor: data.leaderMajor ?? undefined,
        member1Name: data.member1Name ?? undefined,
        member1Email: data.member1Email ?? undefined,
        member1PhoneNumber: data.member1PhoneNumber ?? undefined,
        member1Institution: data.member1Institution ?? undefined,
        member1Batch: data.member1Batch ?? undefined,
        member1Major: data.member1Major ?? undefined,
        member2Name: data.member2Name ?? undefined,
        member2Email: data.member2Email ?? undefined,
        member2PhoneNumber: data.member2PhoneNumber ?? undefined,
        member2Institution: data.member2Institution ?? undefined,
        member2Batch: data.member2Batch ?? undefined,
        member2Major: data.member2Major ?? undefined,
        whereDidYouKnowThisCompetitionInformation:
          data.whereDidYouKnowThisCompetitionInformation ?? undefined,
        leaderTwibbonLink: data.leaderTwibbonLink ?? undefined,
        member1TwibbonLink: data.member1TwibbonLink ?? undefined,
        member2TwibbonLink: data.member2TwibbonLink ?? undefined,
        leaderPostLink: data.leaderPostLink ?? undefined,
        member1PostLink: data.member1PostLink ?? undefined,
        member2PostLink: data.member2PostLink ?? undefined,
        isUsingReferral: data.isUsingRefferalCode ?? undefined,
        referralCode: data.refferalCode ?? undefined,
      })
    );
  };

  const uploadFile = async (file: File, filename: string) => {
    if (!caseRegist) return;
    await uploader(
      `${filename}-${
        caseRegist.id.length >= 3
          ? caseRegist.id.slice(caseRegist.id.length - 3, caseRegist.id.length)
          : ""
      }.zip`,
      FolderEnum.CASE_COMP_FILES,
      AllowableFileTypeEnum.ZIP,
      file
    ).then((res) => {
      caseRegistSaveMutation.mutateAsync({
        fileUploadLink: res?.url,
      });
    }),
      {
        thenFn: () => {
          caseRegistQuery.refetch();
        },
      };
  };

  const cancelRegistration = async () => {
    toaster(caseRegistDeleteMutation.mutateAsync());
  };

  const checkRefferalCodeHandler = (code: string) => {
    checkRefferalCode.mutateAsync({ refferalCode: code }).then((res) => {
      toast({
        title: "Check Result",
        description: res,
        duration: 3000,
        isClosable: true,
      });
    });
  };

  if (caseRegistQuery.isLoading) return <Loading />;

  if (caseRegist?.status === RegistrationStatus.SUBMITTED_CONFIRMED) {
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
      </Flex>
    );
  }

  if (caseRegist?.status === RegistrationStatus.SUBMITTED_UNCONFIRMED) {
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
  )

  return (
    <CaseCompetitionRegistration
      initialFormValues={caseRegist}
      submitForm={submitForm}
      saveForm={saveForm}
      uploadFile={uploadFile}
      initialImgUrl={caseRegist?.fileUploadLink ?? undefined}
      status={caseRegist?.status ?? RegistrationStatus.FORM_FILLING}
      cancelRegistration={cancelRegistration}
      checkRefferal={checkRefferalCodeHandler}
    />
  );
}

// Ini gr2 kegoblokan alif yang ga bikin komponen terpisah dari page
export default function ColorRunRegistrationPage() {
  const { data: session } = useSession();
  return (
    <AuthorizedRoleLayout session={session}>
      <CaseCompetitiontRegistrationPageComponent />
    </AuthorizedRoleLayout>
  );
}
