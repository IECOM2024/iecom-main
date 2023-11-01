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
  ColorRunRegistration,
  FormValues,
} from "~/components/pre-event/ColorRunRegistration";
import { Loading } from "~/components/common/Loading";
import { useToaster } from "~/utils/hooks/useToaster";
import { useUploader } from "~/utils/hooks/useUploader";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { RegistrationStatus } from "@prisma/client";
import { ComingSoon } from "~/components/ComingSoon";

function EventRegistrationPageComponent() {
  const toaster = useToaster();
  const { uploader } = useUploader();
  const { downloader } = useDownloader();
  const [initialImgUrl, setInitialImgUrl] = useState<string | undefined>(); // For Proof of Payment

  const colorRunTicketQuery =
    api.colorRun.participantGetColorRunTicket.useQuery();
  const colorRunTicket = colorRunTicketQuery.data;

  const colorRunTicketSaveMutation =
    api.colorRun.participantSaveColorRunTicket.useMutation();
  const colorRunTicketSubmitMutation =
    api.colorRun.participantSubmitColorRunTicket.useMutation();
  const colorRunTicketDeleteMutation =
    api.colorRun.participantDeleteColorRunTicket.useMutation();

  useEffect(() => {
    if (!colorRunTicket || !colorRunTicket.isFilePaymemtUploaded) {
      return;
    }

    downloader({
      folder: FolderEnum.COLOR_RUN_PROOF,
      filename: `${colorRunTicket.id}.png`,
    }).then(({ url }) => setInitialImgUrl(url));
  }, [colorRunTicket, downloader]);

  const submitForm = async (data: FormValues) => {
    toaster(
      colorRunTicketSaveMutation
        .mutateAsync({
          name: data.name ?? "",
          email: data.email ?? "",
          phoneNumber: data.phoneNumber ?? "",
          address: data.address ?? "",
          institution: data.institution ?? "",
          bloodType: data.bloodType ?? "",
          healthHistory: data.healthHistory ?? "",
          emergencyContactName: data.emergencyContactName ?? "",
          emergencyContactNumber: data.emergencyContactNumber ?? "",
          emergencyContactRelationship: data.emergencyContactRelationship ?? "",
          type: data.partType ?? undefined,
          registFor: data.registFor ?? undefined,
          paidby: data.paidby ?? undefined,
        })
        .then(() => colorRunTicketSubmitMutation.mutateAsync())
    );
  };

  const saveForm = async (data: FormValues) => {
    toaster(
      colorRunTicketSaveMutation.mutateAsync({
        name: data.name ?? "",
        email: data.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
        address: data.address ?? "",
        institution: data.institution ?? "",
        bloodType: data.bloodType ?? "",
        healthHistory: data.healthHistory ?? "",
        emergencyContactName: data.emergencyContactName ?? "",
        emergencyContactNumber: data.emergencyContactNumber ?? "",
        emergencyContactRelationship: data.emergencyContactRelationship ?? "",
        type: data.partType ?? undefined,
        registFor: data.registFor ?? undefined,
        paidby: data.paidby ?? undefined,
      })
    );
  };

  const uploadFile = async (file: File) => {
    if (!colorRunTicket) return;
    await uploader(
      `${colorRunTicket.id}.png`,
      FolderEnum.COLOR_RUN_PROOF,
      AllowableFileTypeEnum.PNG,
      file
    ).then(() => {
      colorRunTicketSaveMutation.mutateAsync({
        isFilePaymentUploaded: true,
      });
    }),
      {
        thenFn: () => {
          colorRunTicketQuery.refetch();
        },
      };
  };

  const cancelRegistration = async () => {
    toaster(colorRunTicketDeleteMutation.mutateAsync());
  };

  if (colorRunTicketQuery.isLoading) return <Loading />;

  return (
    <ColorRunRegistration
      initialFormValues={colorRunTicket}
      submitForm={submitForm}
      saveForm={saveForm}
      uploadFile={uploadFile}
      initialImgUrl={initialImgUrl}
      status={colorRunTicket?.status ?? RegistrationStatus.FORM_FILLING}
      cancelRegistration={cancelRegistration}
      messageFromAdmin={colorRunTicket?.messageFromAdmin ?? undefined}
    />
  );
}

// Ini gr2 kegoblokan alif yang ga bikin komponen terpisah dari page
export default function ColorRunRegistrationPage() {
  const { data: session } = useSession();

  return (
    <AuthorizedRoleLayout session={session}>
      <EventRegistrationPageComponent />
    </AuthorizedRoleLayout>
  );
}
