import {
  Box,
  Button,
  Flex,
  FormControl,
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
} from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

type FormValues = {
  participantName: string;
  participantEmail: string;
  participantPhoneNumber: string;
  participantInstitution: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values,
    errors: {},
  };
};

interface EventRegistrationModalProps {
  editEventTicket: (
    data: RouterInputs["event"]["participantEditEventTicket"]
  ) => Promise<void>;
  deleteEventTicket: (
    data: RouterInputs["event"]["participantDeleteEventTicket"]
  ) => Promise<void>;
  eventList: RouterOutputs["event"]["participantGetEventList"];
  eventTicket: RouterOutputs["event"]["participantGetEventTicketList"][0];
}

export const EditEventRegistrationModal = ({
  editEventTicket,
  eventList,
  eventTicket,
  deleteEventTicket,
}: EventRegistrationModalProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      participantName: eventTicket.participantName,
      participantEmail: eventTicket.participantEmail,
      participantPhoneNumber: eventTicket.participantPhoneNumber,
      participantInstitution: eventTicket.participantInstitution,
    },
  });

  const onSubmit = handleSubmit((data) => {
    editEventTicket({ ...data, id: eventTicket.id }).then(() => onClose());
  });

  return (
    <>
      <Button
        variant="mono-outline"
        onClick={onOpen}
        w={{ base: "100%", lg: "8em" }}
        h="1.5em"
      >
        <Box m="auto">
          <MdEdit />
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir="column" w="100%">
                  <FormControl>
                    <Text fontSize="xl" textAlign="center">
                      Registrant Information
                    </Text>
                    <Table w="100%">
                      <Tbody>
                        <Tr>
                          <Td border="none" w="5em">
                            <Text>Name</Text>
                          </Td>
                          <Td>
                            <Input
                              {...register("participantName", {
                                required: true,
                              })}
                              w="min(10em,95%)"
                              color="white"
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="none" w="5em">
                            <Text>Email </Text>
                          </Td>
                          <Td>
                            <Input
                              {...register("participantEmail", {
                                required: true,
                              })}
                              w="min(10em,95%)"
                              color="white"
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="none" w="5em">
                            <Text>Phone Number</Text>
                          </Td>
                          <Td>
                            <Input
                              {...register("participantPhoneNumber", {
                                required: true,
                              })}
                              w="min(10em,95%)"
                              color="white"
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="none" w="5em">
                            <Text>Institution</Text>
                          </Td>
                          <Td>
                            <Input
                              {...register("participantInstitution", {
                                required: true,
                              })}
                              w="min(10em,95%)"
                              color="white"
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="none" w="5em">
                            <Text>Register For</Text>
                          </Td>
                          <Td>
                            <Text>{eventTicket.event.name}</Text>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <DeleteEventModal
                  confirm={() =>
                    deleteEventTicket({ id: eventTicket.id }).then(() =>
                      onClose()
                    )
                  }
                />
                <Button variant="mono-outline" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeleteEventModal = ({ confirm }: { confirm: () => void }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="monoOutline" color="red.300">
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this event?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="monoOutline" onClick={confirm}>
              Yes
            </Button>
            <Button variant="monoOutline" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
