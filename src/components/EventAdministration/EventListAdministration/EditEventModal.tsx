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
  useToast,
} from "@chakra-ui/react";
import { EventStatus } from "@prisma/client";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { DateInput } from "~/components/common/DateInput";
import { TimeInput } from "~/components/common/TimeInput";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";

interface EditEventModalProps {
  editEvent: (data: RouterInputs["event"]["adminEditEvent"]) => Promise<void>;
  event: RouterOutputs["event"]["adminGetEventList"][0];
}

type FormValues = {
  name: string;
  description: string;
  location: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values,
    errors: {},
  };
};

export const EditEventModal = ({ editEvent, event }: EditEventModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: event.name,
      description: event.description,
      location: event.location,
    },
  });

  const [dateInput, setDateInput] = useState<Date | undefined>(new Date());
  const [startTimeInput, setStartTimeInput] = useState<[number, number]>([
    event.startTime.getHours(),
    event.startTime.getMinutes(),
  ]);
  const [endTimeInput, setEndTimeInput] = useState<[number, number]>([
    event.endTime.getHours(),
    event.endTime.getMinutes(),
  ]);

  const sanitizeAddEventData = () => {
    const startTime = dateInput ? new Date(dateInput) : new Date();
    startTime.setHours(startTimeInput[0], startTimeInput[1]);
    const endTime = dateInput ? new Date(dateInput) : new Date();
    endTime.setHours(endTimeInput[0], endTimeInput[1]);

    return {
      date: dateInput,
      startTime: startTime,
      endTime: endTime,
    };
  };

  const onSubmit = handleSubmit((data: FormValues) => {
    editEvent({
      ...sanitizeAddEventData(),
      ...data,
      id: event.id,
      status: event.status
    }).then(() => {
      onClose();
    });
  });

  const changePublished = () => {
    editEvent({ ...event, status: event.status === EventStatus.PUBLISHED ? EventStatus.UNPUBLISHED : EventStatus.PUBLISHED}).then(() => {
      onClose();
    });
  };

  return (
    <>
      <Button variant="mono-outline" onClick={onOpen} h="1.5em">
        <Box m="auto">
          <MdEdit />
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Add Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir="column" w="100%">
                <FormControl>
                  <Table w="100%">
                    <Tbody>
                      <Tr>
                        <Td border="none" w="5em">
                          <Text>Name</Text>
                        </Td>
                        <Td>
                          <Input
                            {...register("name", { required: true })}
                            w="min(10em,95%)"
                            color="white"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td border="none" w="5em">
                          <Text>Description</Text>
                        </Td>
                        <Td>
                          <Input
                            {...register("description", { required: true })}
                            w="min(10em,95%)"
                            color="white"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td w="5em">
                          <Text>Date</Text>
                        </Td>
                        <Td>
                          <DateInput
                            dateState={dateInput}
                            setDateState={setDateInput}
                            w="min(10em,95%)"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td w="5em">
                          <Text>Start Time</Text>
                        </Td>
                        <Td>
                          <TimeInput
                            timeState={startTimeInput}
                            setTimeState={setStartTimeInput}
                            w="min(10em,95%)"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td w="5em">
                          <Text>End Time</Text>
                        </Td>
                        <Td>
                          <TimeInput
                            timeState={endTimeInput}
                            setTimeState={setEndTimeInput}
                            w="min(10em,95%)"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td border="none" w="5em">
                          <Text>Location</Text>
                        </Td>
                        <Td>
                          <Input
                            {...register("location", { required: true })}
                            w="min(10em,95%)"
                            color="white"
                          />
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </FormControl>
              </Flex>
              <Button w="95%" m="auto" onClick={changePublished}>
                {event.status === EventStatus.PUBLISHED ? "Unpublish" : "Publish"}
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button variant="mono-outline" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
