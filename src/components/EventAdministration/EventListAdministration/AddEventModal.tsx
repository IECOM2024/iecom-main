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
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { DateInput } from "~/components/common/DateInput";
import { TimeInput } from "~/components/common/TimeInput";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";

interface AddEventModalProps {
  addEvent: (data: RouterInputs["event"]["adminCreateEvent"]) => void;
}

type FormValues = {
  name: string;
  description: string;
  location: string;
};

const resolver: Resolver<FormValues> = (values) => {
  return {
    values: values,
    errors: {},
  };
};

export const AddEventModal = ({ addEvent }: AddEventModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [dateInput, setDateInput] = useState<Date | undefined>(new Date());
  const [startTimeInput, setStartTimeInput] = useState<[number, number]>([
    0, 0,
  ]);
  const [endTimeInput, setEndTimeInput] = useState<[number, number]>([0, 0]);

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
    console.log({ ...sanitizeAddEventData(), ...data });
    addEvent({ ...sanitizeAddEventData(), ...data });
  });

  return (
    <>
      <Button
        variant="mono-outline"
        onClick={onOpen}
        w={{ base: "100%", lg: "8em" }}
        h="2em"
      >
        Add Event
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
            </ModalBody>
            <ModalFooter>
              <Button variant="mono-outline" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
