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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { FileInput } from "~/components/common/CustomForm/FileInput";
import { useState } from "react";
import { ParticipantType, RegisFor, RegistrationStatus } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty().optional().nullable(),
  email: z.string().email().nonempty().optional().nullable(),
  phoneNumber: z.string().nonempty().optional().nullable(),
  address: z.string().nonempty().optional().nullable(),
  institution: z.string().nonempty().optional().nullable(),
  bloodType: z.string().nonempty().optional().nullable(),
  healthHistory: z.string().nonempty().optional().nullable(),
  emergencyContactNumber: z.string().nonempty().optional().nullable(),
  emergencyContactName: z.string().nonempty().optional().nullable(),
  emergencyContactRelationship: z.string().nonempty().optional().nullable(),
  partType: z
    .union([
      z.literal(ParticipantType.ITB_STUDENT),
      z.literal(ParticipantType.PUBLIC),
    ])
    .optional()
    .nullable(),
  registFor: z
    .union([z.literal(RegisFor.INDIVIDUAL), z.literal(RegisFor.BUNDLE)])
    .optional()
    .nullable(),
  paidby: z.string().nonempty().optional().nullable(),
});

export type FormValues = z.infer<typeof schema>;

interface ColorRunProps {
  initialFormValues?: Partial<FormValues>;
  initialImgUrl?: string;
  submitForm: (data: FormValues) => void;
  saveForm: (data: FormValues) => void;
  uploadFile: (file: File) => void;
  status: RegistrationStatus;
  cancelRegistration: () => void;
}

export const ColorRunRegistration = ({
  initialFormValues,
  initialImgUrl,
  submitForm,
  saveForm,
  uploadFile,
  status,
  cancelRegistration,
}: ColorRunProps) => {
  const { handleSubmit, register, formState, getValues, setValue, watch } =
    useForm<FormValues>({
      defaultValues: initialFormValues,
      resolver: zodResolver(schema),
    });
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

  const onSave = async () => {
    const data = getValues();
    saveForm(data);
    if (paymentInputStateArr[0]) {
      const file = paymentInputStateArr[0];
      if (file) {
        uploadFile(file);
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
              Color Run Registration
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
              title="Name"
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
              field="address"
              title="Address"
              register={register}
              error={formState.errors.address}
            />
            <FormTextField
              field="institution"
              title="Institution"
              register={register}
              error={formState.errors.institution}
            />

            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Blood Type
            </Text>

            <Select
              placeholder="Select"
              {...register("bloodType")}
              mt="0.5em"
              w="50%"
            >
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </Select>

            <FormTextField
              field="healthHistory"
              title="Medical History"
              register={register}
              error={formState.errors.healthHistory}
            />
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              w="100%"
              mt="1em"
            >
              Emergency Contact Information
            </Text>
            <FormTextField
              field="emergencyContactNumber"
              title="Emergency Contact Number"
              register={register}
              error={formState.errors.emergencyContactNumber}
            />
            <FormTextField
              field="emergencyContactName"
              title="Emergency Contact Name"
              register={register}
              error={formState.errors.emergencyContactName}
            />
            <FormTextField
              field="emergencyContactRelationship"
              title=" Relationship with the Emergency Contact Person"
              register={register}
              error={formState.errors.emergencyContactRelationship}
            />
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              w="100%"
            >
              Payment Information
            </Text>
            <UnorderedList color="blue" fontWeight="bold" mt="1em">
              <li>For ITB Student, the registration fee is IDR 125.000</li>
              <li>For Non-ITB Student :</li>
              <UnorderedList>
                <li>Individual : IDR 165.000</li>
                <li>Bundled (for 3 person) : IDR 150.000 per person</li>
              </UnorderedList>
            </UnorderedList>
            <Text color="blue" fontWeight="bold" fontSize="xl" mt="1em">
              To Complete Color Run Registration, Please Transfer the required
              amount to any of the following accounts:
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Bank Name: Bank Central Asia
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Account Holder: Carissa Raynadhira
            </Text>
            <Text color="blue" fontSize="xl" mt="1em">
              Account Number: 7772755085
            </Text>
            <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
              Participant Type
            </Text>

            <Select
              placeholder="Select"
              {...register("partType")}
              mt="0.5em"
              w="50%"
            >
              <option value="ITB_STUDENT">ITB_STUDENT</option>
              <option value="PUBLIC">PUBLIC</option>
            </Select>
            {watch("partType") === ParticipantType.PUBLIC && (
              <>
                <Text color="blue" fontWeight="bold" fontSize="2xl" mt="1em">
                  Participant Type
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
                    error={formState.errors.paidby}
                  />
                )}
              </>
            )}
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
                participant as the file name
              </li>
              <li>
                For ITB participants : Student ID (in JPG/PNG/PDF format) with
                name of the team_the member's position_Student ID
              </li>
            </UnorderedList>
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
