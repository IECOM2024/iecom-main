import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useState } from "react";
import { RegistrationStatus } from "@prisma/client";

export type FormValues = {
  teamName: string | null;
  leaderName: string | null;
  leaderEmail: string | null;
  leaderPhoneNumber: string | null;
  leaderInstitution: string | null;
  leaderBatch: string | null;
  leaderMajor: string | null;
  member1Name: string | null;
  member1Email: string | null;
  member1PhoneNumber: string | null;
  member1Institution: string | null;
  member1Batch: string | null;
  member1Major: string | null;
  member2Name: string | null;
  member2Email: string | null;
  member2PhoneNumber: string | null;
  member2Institution: string | null;
  member2Batch: string | null;
  member2Major: string | null;
  whereDidYouKnowThisCompetitionInformation: string | null;
};

interface CaseCompetitionRegistrationProps {
  initialFormValues?: Partial<FormValues>;
  initialImgUrl?: string;
  submitForm: (data: FormValues) => void;
  saveForm: (data: FormValues) => void;
  uploadFile: (file: File) => void;
  status: RegistrationStatus;
  cancelRegistration: () => void;
}

export const CaseCompetitionRegistration = ({
  initialFormValues,
  initialImgUrl,
  submitForm,
  saveForm,
  uploadFile,
  status,
  cancelRegistration,
}: CaseCompetitionRegistrationProps) => {
  const { handleSubmit, register, formState, getValues, setValue } =
    useForm<FormValues>({ defaultValues: initialFormValues });
  const paymentInputStateArr = useState<File | null | undefined>(null);

  const onSubmit = handleSubmit((data) => {
    submitForm(data);
    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        uploadFile(file);
      }
    }
  });

  const onSave = handleSubmit((data) => {
    saveForm(data);
    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        uploadFile(file);
      }
    }
  });

  return (
    <Flex
      flexDir="column"
      w="min(55em,90%)"
      justifyContent="center"
      bg="whiteCream"
      borderRadius="10px"
      my="2em"
      mx="auto"
      p="4rem"
    >
      <form onSubmit={onSubmit}>
        <FormControl>
          <Flex w="100%" flexDir="column">
            <Text
              textAlign="center"
              fontSize="5xl"
              color="blue"
              fontWeight="bold"
            >
              Color Run Registration
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
              error={formState.errors.teamName}
            />
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Leader Information
            </Text>
            <FormTextField
              field="leaderName"
              title="Name"
              register={register}
              error={formState.errors.leaderName}
            />
            <FormTextField
              field="leaderEmail"
              title="Email"
              register={register}
              error={formState.errors.leaderEmail}
            />
            <FormTextField
              field="leaderPhoneNumber"
              title="Phone Number"
              register={register}
              error={formState.errors.leaderPhoneNumber}
            />
            <FormTextField
              field="leaderInstitution"
              title="Institution"
              register={register}
              error={formState.errors.leaderInstitution}
            />
            <FormTextField
              field="leaderBatch"
              title="Batch"
              register={register}
              error={formState.errors.leaderBatch}
            />
            <FormTextField
              field="leaderMajor"
              title="Major"
              register={register}
              error={formState.errors.leaderMajor}
            />
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Member 1 Information
            </Text>
            <FormTextField
              field="member1Name"
              title="Name"
              register={register}
              error={formState.errors.member1Name}
            />
            <FormTextField
              field="member1Email"
              title="Email"
              register={register}
              error={formState.errors.member1Email}
            />
            <FormTextField
              field="member1PhoneNumber"
              title="Phone Number"
              register={register}
              error={formState.errors.member1PhoneNumber}
            />
            <FormTextField
              field="member1Institution"
              title="Institution"
              register={register}
              error={formState.errors.member1Institution}
            />
            <FormTextField
              field="member1Batch"
              title="Batch"
              register={register}
              error={formState.errors.member1Batch}
            />
            <FormTextField
              field="member1Major"
              title="Major"
              register={register}
              error={formState.errors.member1Major}
            />
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Member 2 Information
            </Text>
            <FormTextField
              field="member2Name"
              title="Name"
              register={register}
              error={formState.errors.member1Name}
            />
            <FormTextField
              field="member2Email"
              title="Email"
              register={register}
              error={formState.errors.member2Email}
            />
            <FormTextField
              field="member2PhoneNumber"
              title="Phone Number"
              register={register}
              error={formState.errors.member1PhoneNumber}
            />
            <FormTextField
              field="member2Institution"
              title="Institution"
              register={register}
              error={formState.errors.member2Institution}
            />
            <FormTextField
              field="member2Batch"
              title="Batch"
              register={register}
              error={formState.errors.member2Batch}
            />
            <FormTextField
              field="member2Major"
              title="Major"
              register={register}
              error={formState.errors.member2Major}
            />
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Where did you know this competition information?
            </Text>
            <Select
              mx="auto"
              mt="0.5em"
              {...register("whereDidYouKnowThisCompetitionInformation")}
              borderColor={
                formState.errors.whereDidYouKnowThisCompetitionInformation
                  ?.message
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
              {formState.errors.whereDidYouKnowThisCompetitionInformation
                ?.message
                ? formState.errors.whereDidYouKnowThisCompetitionInformation
                    ?.message
                : undefined}
            </Text>
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              w="100%"
            >
              Payment Information
            </Text>
            <Text color="blue" fontWeight="bold" fontSize="xl" mt="1em">
              Each team must pay registration fee with these following
              requirements.
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              National Students: Rp300,000.00 or USD 20
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              International Students: Rp375,000.00 or USD 24
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              Please Transfer the Registration Fee to the following account
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              Bank Name: Bank Central Asia
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              Account Holder: Rafida Khairani
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              Account Number: 2521497728
            </Text>
            <Flex mt="1em" w="100%" justifyContent="center">
              <FileInput
                fileStateArr={paymentInputStateArr}
                imgUrl={initialImgUrl}
              />
            </Flex>
            <Box h="1px" w="100%" mx="auto" bg="black" my="1em" />
            {status !== RegistrationStatus.SUBMITTED_CONFIRMED ? (
              <>
                <Button
                  variant="mono-outline"
                  w="80%"
                  mx="auto"
                  mt="1em"
                  color="blue"
                  fontSize="lg"
                  onClick={onSave}
                >
                  Save
                </Button>
                <SubmitFormModal onSubmit={onSubmit} />
              </>
            ) : (
              <Text color="blue" mt="1em">
                You have already registered and your payment has been confirmed
              </Text>
            )}
            {(status === RegistrationStatus.FORM_FILLING ||
              status === RegistrationStatus.UNREGISTERED ||
              status === RegistrationStatus.SUBMITTED_UNCONFIRMED) && (
              <CancelFormModal onCancel={cancelRegistration} />
            )}
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

const SubmitFormModal = ({ onSubmit }: { onSubmit: () => void }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button
        w="80%"
        mx="auto"
        mt="1em"
        color="white"
        bg="blue"
        fontSize="lg"
        _hover={{ color: "blue", bg: "white" }}
        onClick={onOpen}
      >
        Submit
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to submit?</ModalHeader>
          <ModalBody>
            Once you have submitted, our team will review your data. We will
            contact you via registered email.
          </ModalBody>
          <ModalFooter>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap="1em"
              w={{ base: "100%", md: "auto" }}
            >
              <Button
                onClick={onClose}
                variant="mono-gray"
                w={{ base: "100%", md: "5em" }}
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                variant="blue"
                w={{ base: "100%", md: "5em" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const CancelFormModal = ({ onCancel }: { onCancel: () => void }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button
        w="80%"
        mx="auto"
        mt="1em"
        color="salmon"
        bg="white"
        fontSize="lg"
        borderColor="salmon"
        _hover={{ color: "blue", bg: "salmon" }}
        onClick={onOpen}
      >
        Delete Form
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete your registration?
          </ModalHeader>
          <ModalBody>
            Once you have deleted your registration, your data will be lost.
          </ModalBody>
          <ModalFooter>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap="1em"
              w={{ base: "100%", md: "auto" }}
            >
              <Button
                onClick={onClose}
                variant="mono-gray"
                w={{ base: "100%", md: "5em" }}
              >
                No
              </Button>
              <Button
                onClick={onCancel}
                variant="salmon-outline"
                w={{ base: "100%", md: "10em" }}
              >
                Cancel Registration
              </Button>
            </Flex>
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
