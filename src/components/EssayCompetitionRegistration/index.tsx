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
  useToast,
} from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useState } from "react";
import { RegistrationStatus } from "@prisma/client";
import { object, z } from "zod";
import { AllowableFileTypeEnum } from "~/utils/file";

const schema = z.object({
  name: z.string().nonempty().optional().nullable(),
  email: z.string().nonempty().email().optional().nullable(),
  phoneNumber: z.string().nonempty().optional().nullable(),
  institution: z.string().nonempty().optional().nullable(),
  major: z.string().nonempty().optional().nullable(),
  batch: z.string().nonempty().optional().nullable(),
  postLink: z.string().nonempty().optional().nullable(),
  twibbonLink: z.string().nonempty().optional().nullable(),
  whereDidYouKnowThisCompetitionInformation: z
    .string()
    .nonempty()
    .optional()
    .nullable(),
});

export type FormValues = z.infer<typeof schema>;

interface EssayCompetitionRegistrationProps {
  initialFormValues?: Partial<FormValues>;
  initialImgUrl?: string;
  submitForm: (data: FormValues) => void;
  saveForm: (data: FormValues) => void;
  uploadFile: (file: File, filename: string) => void;
  status: RegistrationStatus;
  cancelRegistration: () => void;
  messageFromAdmin?: string;
}

export const TWIBPOST_LINK = "https://bit.ly/IECOMTwibbonPoster";

export const EssayCompetitionRegistration = ({
  initialFormValues,
  initialImgUrl,
  submitForm,
  saveForm,
  uploadFile,
  status,
  cancelRegistration,
  messageFromAdmin,
}: EssayCompetitionRegistrationProps) => {
  const { handleSubmit, register, formState, getValues, setValue, trigger } =
    useForm<FormValues>({
      defaultValues: initialFormValues,
      resolver: zodResolver(schema),
    });

  const toast = useToast();
  const paymentInputStateArr = useState<File | null | undefined>(null);
  const isFrozen =
    status === RegistrationStatus.SUBMITTED_UNCONFIRMED ||
    status === RegistrationStatus.SUBMITTED_CONFIRMED;

  const validateFileUpload = () => {
    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        return true;
      }
    }

    if (initialImgUrl) {
      return true;
    }

    return false;
  };

  const onSubmit = handleSubmit((data) => {
    if (!validateFileUpload()) {
      toast({
        title: "File Upload is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        uploadFile(file, (data.name ?? ""));
      }
    }
    submitForm(data);

  });

  const onSave = () => {
    const data = getValues();
    saveForm(data);
    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        uploadFile(file, (data.name ?? ""));
      }
    }
  };

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
              desc="use international format, ex: +6281234567890"
            />
            <FormTextField
              field="institution"
              title="Institution"
              register={register}
              error={formState.errors.institution}
              desc="ex: Bandung Institute of Technology"
            />
            <FormTextField
              field="major"
              title="Major"
              register={register}
              error={formState.errors.major}
              desc="ex: Industrial Engineering"
            />
            <FormTextField
              field="batch"
              title="Batch"
              register={register}
              error={formState.errors.batch}
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
                Participant must post twibbon (which can be accessed through{" "}
                <a href={TWIBPOST_LINK}>bit.ly/IECOMTwibbonPoster</a>) on their
                Instagram account and tag @IECOM2024 and 3 friends. The proof of
                twibbon upload must be attached in the registration form in
                JPG/PNG/PDF format
              </li>
              <li>
                Participant must post IECOM 2024 poster (which can be accessed
                through on their Instagram story) and tag{" "}
                <a href="https://www.instagram.com/iecom2024">@IECOM2024</a> and
                3 friends. The proof of poster upload must be attached in the
                registration form in JPG/PNG/PDF form and the link must be
                entered below.
              </li>
            </UnorderedList>

            <FormTextField
              field="twibbonLink"
              title="Twibbon Upload Link"
              register={register}
              error={formState.errors.twibbonLink}
              isFrozen={isFrozen}
              desc="ex: https://www.instagram.com/p/CyqRn72RzhP"
            />
            <FormTextField
              field="postLink"
              title="Repost Link"
              register={register}
              error={formState.errors.postLink}
              isFrozen={isFrozen}
              desc="ex: https://www.instagram.com/p/CyqRn72RzhP"
            />

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
              Each participant must pay the registration fee with these
              following requirements.
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
              Please zip all the required files into one zip file and upload it
              by the button below
            </Text>
            <Text color="blue" mt="1em">
              Files to be included in zip :
            </Text>
            <UnorderedList color="blue" fontSize="md" textAlign="justify">
              <li>
                Twibbon upload proof (JPG/PNG/PDF format) (max file size 5 MB)
              </li>
              <li>
                Poster upload proof (JPG/PNG/PDF format) (max file size 5 MB)
              </li>
              <li>Payment proof (JPG/PNG/PDF format) (max file size 5 MB)</li>
            </UnorderedList>
            <Flex mt="1em" w="100%" justifyContent="center">
              <FileInput
                fileStateArr={paymentInputStateArr}
                imgUrl={initialImgUrl}
                allowed={[AllowableFileTypeEnum.ZIP]}
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
                <SubmitFormModal
                  onSubmit={onSubmit}
                  isError={!formState.isValid}
                  trigger={trigger}
                />
              </>
            ) : (
              <Text color="blue" mt="1em">
                You have already registered and your payment has been confirmed
              </Text>
            )}
            {messageFromAdmin && (
              <Text color="blue" mt="1em">
                {messageFromAdmin}
              </Text>
            )}
            {(status === RegistrationStatus.FORM_FILLING ||
              status === RegistrationStatus.UNREGISTERED ||
              status === RegistrationStatus.SUBMITTED_UNCONFIRMED) && (
              <CancelFormModal onCancel={async () => cancelRegistration()} />
            )}
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

const SubmitFormModal = ({
  onSubmit,
  isError,
  trigger,
}: {
  onSubmit: () => Promise<void>;
  isError: boolean;
  trigger: () => void;
}) => {
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
        onClick={() => {
          trigger();
          if (!isError) {
            onOpen();
          }
        }}
        isDisabled={isError}
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
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onSubmit();
                  }, 150)
                }}
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

const CancelFormModal = ({ onCancel }: { onCancel: () => Promise<void> }) => {
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
                onClick={() => onCancel().then(onClose)}
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
  isFrozen = false,
}: {
  field: T;
  title: string | null;
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>[T];
  desc?: string | null;
  isFrozen?: boolean;
}) => (
  <>
    <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
      {title}
    </Text>
    {desc && (
      <Text color="blue" fontWeight="bold" fontSize="md" mb="0.5em">
        {desc}
      </Text>
    )}
    <Input
      type="text"
      mx="auto"
      mt="0.5em"
      {...register(field)}
      borderColor={error?.message ? "salmon" : undefined}
      isDisabled={isFrozen}
    />
    <Text color="salmon" h="1em">
      {error?.message ? error.message : undefined}
    </Text>
  </>
);
