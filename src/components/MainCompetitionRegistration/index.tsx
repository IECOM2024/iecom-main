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
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useState } from "react";
import { RegistrationStatus } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllowableFileTypeEnum } from "~/utils/file";

const schema = z.object({
  teamName: z.string().nonempty().optional().nullable(),
  leaderName: z.string().nonempty().optional().nullable(),
  leaderEmail: z.string().email().optional().nullable(),
  leaderPhoneNumber: z.string().nonempty().optional().nullable(),
  leaderInstitution: z.string().nonempty().optional().nullable(),
  leaderBatch: z.string().nonempty().optional().nullable(),
  leaderMajor: z.string().nonempty().optional().nullable(),
  member1Name: z.string().nonempty().optional().nullable(),
  member1Email: z.string().email().optional().nullable(),
  member1PhoneNumber: z.string().nonempty().optional().nullable(),
  member1Institution: z.string().nonempty().optional().nullable(),
  member1Batch: z.string().nonempty().optional().nullable(),
  member1Major: z.string().nonempty().optional().nullable(),
  member2Name: z.string().nonempty().optional().nullable(),
  member2Email: z.string().email().optional().nullable(),
  member2PhoneNumber: z.string().nonempty().optional().nullable(),
  member2Institution: z.string().nonempty().optional().nullable(),
  member2Batch: z.string().nonempty().optional().nullable(),
  member2Major: z.string().nonempty().optional().nullable(),
  whereDidYouKnowThisCompetitionInformation: z
    .string()
    .nonempty()
    .optional()
    .nullable(),
  isFilePaymentUploaded: z.boolean().optional().nullable(),
  leaderTwibbonLink: z.string().nonempty().optional().nullable(),
  member1TwibbonLink: z.string().nonempty().optional().nullable(),
  member2TwibbonLink: z.string().nonempty().optional().nullable(),
  leaderPostLink: z.string().nonempty().optional().nullable(),
  member1PostLink: z.string().nonempty().optional().nullable(),
  member2PostLink: z.string().nonempty().optional().nullable(),
  isUsingRefferalCode: z.boolean().optional().nullable(),
  refferalCode: z.string().nonempty().optional().nullable(),
});

export type FormValues = z.infer<typeof schema>;

interface CaseCompetitionRegistrationProps {
  initialFormValues?: Partial<FormValues>;
  initialImgUrl?: string;
  submitForm: (data: FormValues) => void;
  saveForm: (data: FormValues) => void;
  uploadFile: (file: File, filename: string) => void;
  status: RegistrationStatus;
  cancelRegistration: () => void;
  checkRefferal: (code: string) => void;
}

const TWIBPOST_LINK = "https://bit.ly/IECOMTwibbonPoster";

export const CaseCompetitionRegistration = ({
  initialFormValues,
  initialImgUrl,
  submitForm,
  saveForm,
  uploadFile,
  status,
  cancelRegistration,
  checkRefferal,
}: CaseCompetitionRegistrationProps) => {
  const { handleSubmit, register, formState, getValues, setValue, watch } =
    useForm<FormValues>({
      defaultValues: initialFormValues,
      resolver: zodResolver(schema),
    });

  const toast = useToast();
  const paymentInputStateArr = useState<File | null | undefined>(null);

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
        uploadFile(file, data.teamName ?? "");
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
        uploadFile(file, data.teamName ?? "");
      }
    }
  };

  const onCheckReferralCode = () => {
    const data = getValues();
    checkRefferal(data.refferalCode ?? "");
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
              Case Competition Registration
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
              desc="Please include your country code (e.g. +62)"
            />
            <FormTextField
              field="leaderInstitution"
              title="Institution"
              register={register}
              error={formState.errors.leaderInstitution}
              desc="e.g. Bandung Institute of Technology"
            />
            <FormTextField
              field="leaderBatch"
              title="Batch"
              register={register}
              error={formState.errors.leaderBatch}
              desc="e.g. 2020"
            />
            <FormTextField
              field="leaderMajor"
              title="Major"
              register={register}
              error={formState.errors.leaderMajor}
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
              desc="Please include your country code (e.g. +62)"
            />
            <FormTextField
              field="member1Institution"
              title="Institution"
              register={register}
              error={formState.errors.member1Institution}
              desc="e.g. Bandung Institute of Technology"
            />
            <FormTextField
              field="member1Batch"
              title="Batch"
              register={register}
              error={formState.errors.member1Batch}
              desc="e.g. 2020"
            />
            <FormTextField
              field="member1Major"
              title="Major"
              register={register}
              error={formState.errors.member1Major}
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
              desc="Please include your country code (e.g. +62)"
            />
            <FormTextField
              field="member2Institution"
              title="Institution"
              register={register}
              error={formState.errors.member2Institution}
              desc="e.g. Bandung Institute of Technology"
            />
            <FormTextField
              field="member2Batch"
              title="Batch"
              register={register}
              error={formState.errors.member2Batch}
              desc="e.g. 2020"
            />
            <FormTextField
              field="member2Major"
              title="Major"
              register={register}
              error={formState.errors.member2Major}
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
              field="leaderTwibbonLink"
              title="Leader Twibbon Link"
              register={register}
              error={formState.errors.leaderTwibbonLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />
            <FormTextField
              field="member1TwibbonLink"
              title="Member 1 Twibbon Link"
              register={register}
              error={formState.errors.member1TwibbonLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />
            <FormTextField
              field="member2TwibbonLink"
              title="Member 2 Twibbon Link"
              register={register}
              error={formState.errors.member2TwibbonLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />
            <FormTextField
              field="leaderPostLink"
              title="Leader Post Link"
              register={register}
              error={formState.errors.leaderPostLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />
            <FormTextField
              field="member1PostLink"
              title="Member 1 Post Link"
              register={register}
              error={formState.errors.member1PostLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />
            <FormTextField
              field="member2PostLink"
              title="Member 2 Post Link"
              register={register}
              error={formState.errors.member2PostLink}
              desc="e.g. https://www.instagram.com/p/CyqRn72Rzh/"
            />

            {/* Refferal Section */}
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              w="100%"
            >
              Refferal code (optional)
            </Text>

            <Flex alignItems="center" gap="1em" h="3em">
              <Input
                type="checkbox"
                {...register("isUsingRefferalCode")}
                bg={watch("isUsingRefferalCode") ? "blue" : undefined}
                w="1.5em"
                h="1.5em"
                cursor="pointer"
              />
              <Text color="blue" fontWeight="bold" fontSize="md" mt="1em">
                I have a refferal code
              </Text>
            </Flex>
            {watch("isUsingRefferalCode") && (
              <FormTextField
                field="refferalCode"
                title="Refferal Code"
                register={register}
                error={formState.errors.refferalCode}
              />
            )}

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
              Each team must pay registration fee with these following
              requirements.
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              National Students: Rp400,000.00 or USD 26
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              International Students: Rp450,000.00 or USD 29
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
            <Text color="blue" fontSize="md" mt="1em">
              Required files:
            </Text>
            <UnorderedList color="blue" textAlign="justify" gap="2em" my="1em">
              <li>
                Payment proof (in JPG/PNG/PDF format) with name of the
                team_payment as the file name
              </li>
              <li>
                Twibbon post proof (in JPG/PNG/PDF format) with name of the
                team_the member's position_Twibbon as the file name
              </li>
              <li>
                Repost proof (in JPG/PNG/PDF format) with name of the team_the
                member's position_Repost as the file name
              </li>
              <li>
                Student ID (in JPG/PNG/PDF format) with name of the team_the
                member's position_Student ID
              </li>
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
                onClick={() => {
                  onClose();
                  setTimeout(() => onSubmit(), 150);
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
