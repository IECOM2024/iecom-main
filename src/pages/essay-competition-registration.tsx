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
      filename: `${essayRegist.id}.png`,
    }).then(({ url }) => setInitialImgUrl(url));
  }, [essayRegist, downloader]);

  const submitForm = async (data: FormValues) => {
    toaster(
      essayRegistSaveMutation
        .mutateAsync({
          whereDidYouKnowThisCompetitionInformation:
            data.whereDidYouKnowThisCompetitionInformation ?? "",
        })
        .then(() => essayRegistSubmitMutation.mutateAsync())
    );
  };

  const saveForm = async (data: FormValues) => {
    toaster(
      essayRegistSaveMutation.mutateAsync({
        name: data.name ?? "",
        email: data.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
        institution: data.institution ?? "",
        major: data.major ?? "",
        batch: data.batch ?? "",
        postLink: data.postLink ?? "",
        whereDidYouKnowThisCompetitionInformation:
          data.whereDidYouKnowThisCompetitionInformation ?? "",
      })
    );
  };

  const uploadFile = async (file: File) => {
    if (!essayRegist) return;
    await uploader(
      `${essayRegist.id}.png`,
      FolderEnum.COLOR_RUN_PROOF,
      AllowableFileTypeEnum.PNG,
      file
    ).then(() => {
      essayRegistSaveMutation.mutateAsync({
        isFilePaymentUploaded: true,
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

  return (
    <EssayCompetitionRegistration
      initialFormValues={essayRegist}
      submitForm={submitForm}
      saveForm={saveForm}
      uploadFile={uploadFile}
      initialImgUrl={initialImgUrl}
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
