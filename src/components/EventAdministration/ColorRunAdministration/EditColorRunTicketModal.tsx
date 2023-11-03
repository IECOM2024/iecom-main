import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ColorRunParticipantData } from "@prisma/client";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { type FormValues } from "~/components/pre-event/ColorRunRegistration";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import {ParticipantType, RegisFor} from '@prisma/client';

interface EditObjectEntryProps {
  objectContent: ColorRunParticipantData;
  editObject: (data: Partial<ColorRunParticipantData>) => Promise<void>;
  deleteObject: () => void;
}

export const EditColorRunTicketModal = ({
  objectContent,
  editObject,
  deleteObject,
}: EditObjectEntryProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteEventDisclosure = useDisclosure();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormValues>({ defaultValues: {
    ...objectContent,
    partType: objectContent.type ?? ParticipantType.ITB_STUDENT,
  } });

  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      id: objectContent.id,
      registFor: data.registFor ?? objectContent.registFor ?? RegisFor.INDIVIDUAL,
    }
    console.log(newData)

    editObject(newData);
  });

  const onDelete = () => {
    deleteObject();
  };

  return (
    <>
      <Button bg="none" onClick={onOpen}>
        <MdEdit fontSize="2rem" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" w="100%">
              <Text>Edit Entry</Text>
              <FormTextField
                field="name"
                title="Nama"
                register={register}
                error={errors.name}
              />
              <FormTextField
                field="email"
                title="Email"
                register={register}
                error={errors.email}
              />
              <FormTextField
                field="phoneNumber"
                title="Nomor Telepon"
                register={register}
                error={errors.phoneNumber}
              />
              <FormTextField
                field="address"
                title="Alamat"
                register={register}
                error={errors.address}
              />
              <FormTextField
                field="institution"
                title="Institusi"
                register={register}
                error={errors.institution}
              />
              <FormTextField
                field="bloodType"
                title="Golongan Darah"
                register={register}
                error={errors.bloodType}
              />
              <FormTextField
                field="healthHistory"
                title="Riwayat Kesehatan"
                register={register}
                error={errors.healthHistory}
              />
              <FormTextField
                field="emergencyContactName"
                title="Nama Kontak Darurat"
                register={register}
                error={errors.emergencyContactName}
              />
              <FormTextField
                field="emergencyContactNumber"
                title="Nomor Kontak Darurat"
                register={register}
                error={errors.emergencyContactNumber}
              />
              <FormTextField
                field="emergencyContactRelationship"
                title="Hubungan Kontak Darurat"
                register={register}
                error={errors.emergencyContactRelationship}
              />

              <Text fontSize="xl" color="blue" fontWeight="bold">Participant type</Text>
              <Select
              placeholder="Select"
              {...register("partType")}
              mt="0.5em"
              w="50%"
            >
              <option value="ITB_STUDENT">ITB_STUDENT</option>
              <option value="PUBLIC">PUBLIC</option>
              <option value="MTI_MEMBER">MTI_MEMBER</option>
            </Select>
            {watch("partType") === ParticipantType.PUBLIC && (
              <>
                <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
                  Register For
                </Text>

                <Select
                  placeholder="Select"
                  {...register("registFor")}
                  mt="0.5em"
                  w="50%"
                >
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                  <option value="BUNDLE">BUNDLE</option>
                </Select>
                {watch("registFor") === RegisFor.BUNDLE && (
                  <FormTextField
                    field="paidby"
                    title="Participant who paid for the registration"
                    register={register}
                    error={errors.paidby}
                  />
                )}
              </>
            )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="mono-outline" onClick={onSubmit}>
              Simpan
            </Button>
            {/*<Button
              variant="mono-outline"
              color="salmon"
              onClick={deleteEventDisclosure.onOpen}
              ml="1em"
            >
              Hapus Entri
            </Button>
            <Modal
              isOpen={deleteEventDisclosure.isOpen}
              onClose={deleteEventDisclosure.onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Hapus Entri</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Apakah anda yakin ingin menghapus entri ini?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button variant="mono-outline" onClick={deleteObject}>
                    Hapus
                  </Button>
                  <Button
                    variant="mono-outline"
                    onClick={deleteEventDisclosure.onClose}
                    ml="1em"
                  >
                    Batal
                  </Button>
                </ModalFooter>
              </ModalContent>
                </Modal>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const FormTextField = <T extends keyof FormValues>({
  field,
  title,
  register,
  error,
  desc,
}: {
  field: T;
  title: string | null;
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>[T];
  desc?: string | null;
}) => (
  <>
    <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
      {title}
    </Text>
    {desc && (
      <Text color="blue" fontWeight="bold" fontSize="md" mt="0.5em">
        {desc}
      </Text>
    )}
    <Input
      type="text"
      mx="auto"
      mt="0.5em"
      {...register(field)}
      borderColor={error?.message ? "salmon" : undefined}
    />
    <Text color="salmon" h="1em">
      {error?.message ? error.message : undefined}
    </Text>
  </>
);
