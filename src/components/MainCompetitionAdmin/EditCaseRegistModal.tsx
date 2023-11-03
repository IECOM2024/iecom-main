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
  MainCompetitionRegistrationData,
} from "@prisma/client";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ParticipantType, RegisFor } from "@prisma/client";
import { FormValues } from "../MainCompetitionRegistration";
import { UnorderedList } from "@chakra-ui/react";

interface EditObjectEntryProps {
  objectContent: MainCompetitionRegistrationData;
  editObject: (data: Partial<MainCompetitionRegistrationData>) => Promise<void>;
  deleteObject: () => void;
}

export const EditCaseRegistModal = ({
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
      isFilePaymentUploaded: undefined
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
              <Text
                textAlign="center"
                fontSize="3xl"
                color="blue"
                fontWeight="bold"
                w="100%"
              >
                Team Information
              </Text>
              <FormTextField
                field="teamName"
                title="Team Name"
                register={register}
                error={errors.teamName}
              />
              <Text
                color="blue"
                fontWeight="bold"
                fontSize="3xl"
                mt="1em"
                mx="auto"
              >
                Leader Information
              </Text>
              <FormTextField
                field="leaderName"
                title="Name"
                register={register}
                error={errors.leaderName}
              />
              <FormTextField
                field="leaderEmail"
                title="Email"
                register={register}
                error={errors.leaderEmail}
              />
              <FormTextField
                field="leaderPhoneNumber"
                title="Phone Number"
                register={register}
                error={errors.leaderPhoneNumber}
                desc="Please include your country code (e.g. +62)"
              />
              <FormTextField
                field="leaderInstitution"
                title="Institution"
                register={register}
                error={errors.leaderInstitution}
                desc="e.g. Bandung Institute of Technology"
              />
              <FormTextField
                field="leaderBatch"
                title="Batch"
                register={register}
                error={errors.leaderBatch}
                desc="e.g. 2020"
              />
              <FormTextField
                field="leaderMajor"
                title="Major"
                register={register}
                error={errors.leaderMajor}
                desc="e.g. Industrial Engineering"
              />
              <Text
                color="blue"
                fontWeight="bold"
                fontSize="3xl"
                mt="1em"
                mx="auto"
              >
                Member 1 Information
              </Text>
              <FormTextField
                field="member1Name"
                title="Name"
                register={register}
                error={errors.member1Name}
              />
              <FormTextField
                field="member1Email"
                title="Email"
                register={register}
                error={errors.member1Email}
              />
              <FormTextField
                field="member1PhoneNumber"
                title="Phone Number"
                register={register}
                error={errors.member1PhoneNumber}
                desc="Please include your country code (e.g. +62)"
              />
              <FormTextField
                field="member1Institution"
                title="Institution"
                register={register}
                error={errors.member1Institution}
                desc="e.g. Bandung Institute of Technology"
              />
              <FormTextField
                field="member1Batch"
                title="Batch"
                register={register}
                error={errors.member1Batch}
                desc="e.g. 2020"
              />
              <FormTextField
                field="member1Major"
                title="Major"
                register={register}
                error={errors.member1Major}
                desc="e.g. Industrial Engineering"
              />
              <Text
                color="blue"
                fontWeight="bold"
                fontSize="3xl"
                mt="1em"
                mx="auto"
              >
                Member 2 Information
              </Text>
              <FormTextField
                field="member2Name"
                title="Name"
                register={register}
                error={errors.member1Name}
              />
              <FormTextField
                field="member2Email"
                title="Email"
                register={register}
                error={errors.member2Email}
              />
              <FormTextField
                field="member2PhoneNumber"
                title="Phone Number"
                register={register}
                error={errors.member1PhoneNumber}
                desc="Please include your country code (e.g. +62)"
              />
              <FormTextField
                field="member2Institution"
                title="Institution"
                register={register}
                error={errors.member2Institution}
                desc="e.g. Bandung Institute of Technology"
              />
              <FormTextField
                field="member2Batch"
                title="Batch"
                register={register}
                error={errors.member2Batch}
                desc="e.g. 2020"
              />
              <FormTextField
                field="member2Major"
                title="Major"
                register={register}
                error={errors.member2Major}
                desc="e.g. Industrial Engineering"
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
                field="leaderTwibbonLink"
                title="Leader Twibbon Link"
                register={register}
                error={errors.leaderTwibbonLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
              <FormTextField
                field="member1TwibbonLink"
                title="Member 1 Twibbon Link"
                register={register}
                error={errors.member1TwibbonLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
              <FormTextField
                field="member2TwibbonLink"
                title="Member 2 Twibbon Link"
                register={register}
                error={errors.member2TwibbonLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
              <FormTextField
                field="leaderPostLink"
                title="Leader Post Link"
                register={register}
                error={errors.leaderPostLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
              <FormTextField
                field="member1PostLink"
                title="Member 1 Post Link"
                register={register}
                error={errors.member1PostLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
              <FormTextField
                field="member2PostLink"
                title="Member 2 Post Link"
                register={register}
                error={errors.member2PostLink}
                desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
              />
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
