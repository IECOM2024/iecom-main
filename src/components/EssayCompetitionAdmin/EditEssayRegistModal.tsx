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
import {
  ColorRunParticipantData,
  EssayCompetitionRegistrationData,
} from "@prisma/client";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ParticipantType, RegisFor } from "@prisma/client";
import { FormValues } from "../EssayCompetitionRegistration";

interface EditObjectEntryProps {
  objectContent: EssayCompetitionRegistrationData;
  editObject: (
    data: Partial<EssayCompetitionRegistrationData>
  ) => Promise<void>;
  deleteObject: () => void;
}

export const EditEssayRegistModal = ({
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
    watch,
  } = useForm<FormValues>({ defaultValues: objectContent });

  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      id: objectContent.id,
    };

    editObject(newData);
  });

  const onDelete = () => {
    deleteObject();
  };

  const isFrozen = objectContent.status !== "FORM_FILLING";
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
              <Text
                textAlign="center"
                fontSize="3xl"
                color="blue"
                fontWeight="bold"
                w="100%"
              >
                Personal Information
              </Text>
              <FormTextField
                field="name"
                title="Full Name"
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
                title="Phone Number"
                register={register}
                error={errors.phoneNumber}
                desc="use international format, ex: +6281234567890"
              />
              <FormTextField
                field="institution"
                title="Institution"
                register={register}
                error={errors.institution}
                desc="ex: Bandung Institute of Technology"
              />
              <FormTextField
                field="major"
                title="Major"
                register={register}
                error={errors.major}
                desc="ex: Industrial Engineering"
              />
              <FormTextField
                field="batch"
                title="Batch"
                register={register}
                error={errors.batch}
                desc="ex: 2020"
              />
              <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
                Where did you know this competition's information?
              </Text>
              <Select
                w="40%"
                mt="0.5em"
                {...register("whereDidYouKnowThisCompetitionInformation")}
                placeholder="Select option"
                borderColor={
                  errors.whereDidYouKnowThisCompetitionInformation?.message
                    ? "salmon"
                    : undefined
                }
              >
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Line">Line</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </Select>
              <Text color="salmon" h="1em">
                {errors.whereDidYouKnowThisCompetitionInformation?.message
                  ? errors.whereDidYouKnowThisCompetitionInformation?.message
                  : undefined}
              </Text>
              {/* Twibbon Section */}
              <Text
                textAlign="center"
                fontSize="3xl"
                color="blue"
                fontWeight="bold"
                w="100%"
              >
                Twibbon & Post
              </Text>
              <FormTextField
                field="twibbonLink"
                title="Twibbon Upload Link"
                register={register}
                error={errors.twibbonLink}
                desc="ex: https://www.instagram.com/p/CyqRn72RzhP"
              />
              <FormTextField
                field="postLink"
                title="Repost Link"
                register={register}
                error={errors.postLink}
                desc="ex: https://www.instagram.com/p/CyqRn72RzhP"
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            {/* <Button variant="mono-outline" onClick={onSubmit}>
              Simpan
            </Button> */}
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
