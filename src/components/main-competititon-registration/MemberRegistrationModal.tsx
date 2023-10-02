import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ParticipantRegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type MainCompRegistrationFormValues = {
  teamName: string;
  universityName: string;
  universityCountry: string;
  participants: ParticipantRegistrationFormValues[];
};

interface ParticipantFormProps {
  index: number;
  register: ReturnType<
    typeof useForm<MainCompRegistrationFormValues>
  >["register"];
  studentCardState: ReturnType<typeof useState<File | null>>;
  pictureState: ReturnType<typeof useState<File | null>>;
}

export const MainCompParticipantForm = ({
  index,
  register,
  studentCardState,
  pictureState,
}: ParticipantFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <Text color="blue" fontWeight="bold">
          Edit Member
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="3xl" color="blue" fontWeight="bold">
              Member Information
            </Text>
          </ModalHeader>
          <ModalBody>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        First Name
                      </Text>
                      <Input
                        {...register(`participants.${index}.firstName`, {
                          required: true,
                        })}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Last Name
                      </Text>
                      <Input
                        {...register(`participants.${index}.lastName`, {
                          required: true,
                        })}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Email
                      </Text>
                      <Input
                        {...register(`participants.${index}.email`, {
                          required: true,
                        })}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Phone Number
                      </Text>
                      <Input
                        {...register(`participants.${index}.phoneNumber`, {
                          required: true,
                        })}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Student Card
                      </Text>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            studentCardState[1](e.target.files[0]);
                          }
                        }}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Picture
                      </Text>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            pictureState[1](e.target.files[0]);
                          }
                        }}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
