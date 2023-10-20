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
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useState } from "react";
import { RegistrationStatus } from "@prisma/client";

export type FormValues = {
  name: string | null
  email: string | null
  phoneNumber: string | null
  institution: string | null
  major: string | null
  batch: string | null
  whereDidYouKnowThisCompetitionInformation: string | null;
};

interface EssayCompetitionRegistrationProps {
  initialFormValues?: Partial<FormValues>;
  initialImgUrl?: string
  submitForm: (data: FormValues) => void;
  saveForm: (data: FormValues) => void;
  uploadFile: (file: File) => void;
  status: RegistrationStatus;
  cancelRegistration: () => void;
}

const TWIBPOST_LINK = "https://bit.ly/IECOMTwibbonPoster";

export const EssayCompetitionRegistration = ({
  initialFormValues,
  initialImgUrl,
  submitForm,
  saveForm,
  uploadFile,
  status,
  cancelRegistration,
}: EssayCompetitionRegistrationProps) => {
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
              Essay Competition Registration
            </Text>
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
              error={formState.errors.name}
            />
            <FormTextField
              field="email"
              title="Email"
              register={register}
              error={formState.errors.email}
            />
            <FormTextField
              field="phoneNumber"
              title="Phone Number"
              register={register}
              error={formState.errors.phoneNumber}
            />
            <FormTextField
              field="institution"
              title="Institution"
              register={register}
              error={formState.errors.institution}
            />
            <FormTextField
              field="major"
              title="Major"
              register={register}
              error={formState.errors.major}
            />
            <FormTextField
              field="batch"
              title="Batch"
              register={register}
              error={formState.errors.batch}
            />
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Where did you know this competition's information?
            </Text>
            <Select
              mx="auto"
              mt="0.5em"
              {...register("whereDidYouKnowThisCompetitionInformation")}
              placeholder="Select option"
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
            <UnorderedList
              color="blue"
              fontSize="lg"
              textAlign="justify"
              gap="2em"
              my="1em"
            >
              <li>
                Participant must post twibbon (which can be accessed
                through{" "}
                <a href={TWIBPOST_LINK} style={{ textDecoration: "underline" }}>
                  bit.ly/IECOMTwibbonPoster
                </a>
                ) on their Instagram account and tag @IECOM2024 and 3 friends.
                The proof of twibbon upload must be attached in the registration
                form in JPG/PNG/PDF format
              </li>
              <li>
                Participant must post IECOM 2024 poster (which can
                be accessed through on their Instagram story) and tag @IECOM2024
                and 3 friends. The proof of poster upload must be attached in
                the registration form in JPG/PNG/PDF form.
              </li>
            </UnorderedList>

            {/* Payment Information */}
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
              Each participant must pay the registration fee with these following
              requirements.
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Early Bird Registration (until Oct 31st): IDR 60.000 or USD 4
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Normal Registration (from Nov 1st): IDR 80.000 or USD 6
            </Text>
            <Text color="blue" fontWeight="bolder" fontSize="xl" mt="1em">
              Please Transfer the Registration Fee to the following account.
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Bank Name: Bank Central Asia
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Account Holder: Rafida Khairani
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Account Number: 2521497728
            </Text>
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              w="100%"
            >
              File Upload
            </Text>
            <Text color="blue" fontSize="xl" mt="1em" mx="auto">
              Please zip all the required files into one zip file and upload it by the button below
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
