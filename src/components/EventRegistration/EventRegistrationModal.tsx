import {
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
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { FileInput } from "../common/CustomForm/FileInput";

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
  registerEvent: (
    data: RouterInputs["event"]["participantCreateEventTicket"]
  ) => Promise<void>;
  eventList: RouterOutputs["event"]["participantGetEventList"];
  eventType?: string;
  uploadColorRunPayment: (file: File, eventTicketId: string) => void;
  downloadColorRunPayment: (
    eventTicketId: string,
    setState: Dispatch<SetStateAction<string | null | undefined>>
  ) => void;
}

export const EventRegistrationModal = ({
  registerEvent,
  eventList,
  eventType,
  downloadColorRunPayment,
  uploadColorRunPayment,
}: EventRegistrationModalProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const colorRunPaymentFileInput = useState<
    File | null | undefined
  >(null);

  useEffect(() => {
    if (eventType == "color_run" || eventType == "seminar_and_workshop") {
      onOpen();
    }
  }, [onOpen, eventType]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
  });

  const [eventIdInput, setEventIdInput] = useState<string>(eventType ?? "");
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventIdInput(e.target.value);
  };

  const onSubmit = handleSubmit((data) => {
    if (!eventIdInput) return;
    registerEvent({ ...data, eventId: eventIdInput }).then(() => onClose());
  });

  return (
    <>
      <Button
        variant="mono-outline"
        onClick={onOpen}
        w={{ base: "100%", lg: "8em" }}
        h="2em"
      >
        Register Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Registration</ModalHeader>
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
                            <Select
                              value={eventIdInput}
                              onChange={handleSelectChange}
                              placeholder="Select Event"
                            >
                              {eventList.map((event, idx) => (
                                <option value={event.id} key={idx}>
                                  {event.name}
                                </option>
                              ))}
                            </Select>
                          </Td>
                        </Tr>
                        {eventIdInput == "color_run" && (
                          <Tr>
                            <Td border="none" w="5em">
                              <Text>Proof of Payment</Text>
                            </Td>
                            <Td>
                              <FileInput fileStateArr={colorRunPaymentFileInput}/>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="mono-outline" type="submit">
                  Register
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};