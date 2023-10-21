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
      filename: `${caseRegist.id}.png`,
    }).then(({ url }) => setInitialImgUrl(url));
  }, [caseRegist, downloader]);

  const submitForm = async (data: FormValues) => {
    toaster(
      caseRegistSaveMutation
        .mutateAsync({
          teamName: data.teamName ?? "",
          leaderName: data.leaderName ?? "",
          leaderEmail: data.leaderEmail ?? "",
          leaderPhoneNumber: data.leaderPhoneNumber ?? "",
          leaderInstitution: data.leaderInstitution ?? "",
          leaderBatch: data.leaderBatch ?? "",
          leaderMajor: data.leaderMajor ?? "",
          member1Name: data.member1Name ?? "",
          member1Email: data.member1Email ?? "",
          member1PhoneNumber: data.member1PhoneNumber ?? "",
          member1Institution: data.member1Institution ?? "",
          member1Batch: data.member1Batch ?? "",
          member1Major: data.member1Major ?? "",
          member2Name: data.member2Name ?? "",
          member2Email: data.member2Email ?? "",
          member2PhoneNumber: data.member2PhoneNumber ?? "",
          member2Institution: data.member2Institution ?? "",
          member2Batch: data.member2Batch ?? "",
          member2Major: data.member2Major ?? "",
          whereDidYouKnowThisCompetitionInformation:
            data.whereDidYouKnowThisCompetitionInformation ?? "",
        })
        .then(() => caseRegistSubmitMutation.mutateAsync())
    );
  };

  const saveForm = async (data: FormValues) => {
    toaster(
      caseRegistSaveMutation.mutateAsync({
        teamName: data.teamName ?? "",
        leaderName: data.leaderName ?? "",
        leaderEmail: data.leaderEmail ?? "",
        leaderPhoneNumber: data.leaderPhoneNumber ?? "",
        leaderInstitution: data.leaderInstitution ?? "",
        leaderBatch: data.leaderBatch ?? "",
        leaderMajor: data.leaderMajor ?? "",
        member1Name: data.member1Name ?? "",
        member1Email: data.member1Email ?? "",
        member1PhoneNumber: data.member1PhoneNumber ?? "",
        member1Institution: data.member1Institution ?? "",
        member1Batch: data.member1Batch ?? "",
        member1Major: data.member1Major ?? "",
        member2Name: data.member2Name ?? "",
        member2Email: data.member2Email ?? "",
        member2PhoneNumber: data.member2PhoneNumber ?? "",
        member2Institution: data.member2Institution ?? "",
        member2Batch: data.member2Batch ?? "",
        member2Major: data.member2Major ?? "",
        whereDidYouKnowThisCompetitionInformation:
          data.whereDidYouKnowThisCompetitionInformation ?? "",
      })
    );
  };

  const uploadFile = async (file: File) => {
    if (!caseRegist) return;
    // upload file didnt have toaster
    await uploader(
      `${caseRegist.id}.png`,
      FolderEnum.COLOR_RUN_PROOF,
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
