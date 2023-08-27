import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";
import { EventStatus } from "@prisma/client";

interface EventListAdministrationProps {
  eventList: RouterOutputs["event"]["adminGetEventList"];
  eventFn: {
    addEvent: (data: RouterInputs["event"]["adminCreateEvent"]) => Promise<void>;
    updateEvent: (data: RouterInputs["event"]["adminEditEvent"]) => Promise<void>;
  };
}

export const EventListAdministration = ({
  eventList,
  eventFn: { addEvent, updateEvent },
}: EventListAdministrationProps) => {
  return (
    <Flex flexDir="column" px="1em">
      {eventList.length === 0 ? (
        "No event yet"
      ) : (
        <TableContainer>
          <Table w="100%" variant="black" mt="1em">
            <Thead>
              <Tr>
                <Th w="10%">No.</Th>
                <Th w="30%">Title</Th>
                <Th w="20%">Date</Th>
                <Th w="10%">Location</Th>
                <Th w="15%">Start Time</Th>
                <Th w="15%">End Time</Th>
                <Th w="10%">Published ?</Th>
                <Th w="10%">Edit</Th>
              </Tr>
            </Thead>
            <Tbody borderRadius="0 0 12px 12px">
              {eventList.map((event, index) => (
                <EventListRow
                  event={event}
                  num={index + 1}
                  key={event.id}
                  updateEvent={updateEvent}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Flex
        justifyContent="left"
        mt="1em"
        w={{ base: "calc(100% - 1em)", md: "8em" }}
        mx={{ base: "auto", md: "none" }}
      >
        <AddEventModal addEvent={addEvent} />
      </Flex>
    </Flex>
  );
};

interface EventListRowProps {
  event: RouterOutputs["event"]["adminGetEventList"][0];
  num: number;
  updateEvent: (data: RouterInputs["event"]["adminEditEvent"]) => Promise<void>;
}

const EventListRow = ({ event, num, updateEvent }: EventListRowProps) => {
  const startTime = moment(event.startTime);
  const endTime = moment(event.endTime);
  return (
    <Tr>
      <Td>{num}</Td>
      <Td>{event.name}</Td>
      <Td>{startTime.format("DD-MM-YYYY")}</Td>
      <Td>{event.location}</Td>
      <Td>{startTime.format("hh:mm")}</Td>
      <Td>{endTime.format("hh:mm")}</Td>
      <Td>{event.status === EventStatus.PUBLISHED ? "YES" : "NO"}</Td>
      <Td>
        <EditEventModal event={event} editEvent={updateEvent}/>
      </Td>
    </Tr>
  );
};
