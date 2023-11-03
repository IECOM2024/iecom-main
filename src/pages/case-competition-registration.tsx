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
        })
        .then(() => caseRegistSubmitMutation.mutateAsync())
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
      })
    );
  };

  const uploadFile = async (file: File) => {
    if (!caseRegist) return;
    // upload file didnt have toaster
    await uploader(
      `${caseRegist.id}.zip`,
      FolderEnum.CASE_COMP_FILES,
      AllowableFileTypeEnum.PNG,
      file
    ).then(() => {
      caseRegistSaveMutation.mutateAsync({
        isFilePaymentUploaded: true,
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

  if (caseRegistQuery.isLoading) return <Loading />;

  return (
    <CaseCompetitionRegistration
      initialFormValues={caseRegist}
      submitForm={submitForm}
      saveForm={saveForm}
      uploadFile={uploadFile}
      initialImgUrl={initialImgUrl}
      status={caseRegist?.status ?? RegistrationStatus.FORM_FILLING}
      cancelRegistration={cancelRegistration}
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
