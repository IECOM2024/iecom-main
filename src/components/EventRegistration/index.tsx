import { Box, Flex, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { EventListRow } from "./EventListRow";

export const EventRegistration = () => {
  const eventTicketListQuery = api.event.participantGetEventTicketList.useQuery()
  const eventListQuery = api.event.participantGetEventList.useQuery()

  const eventTicketList = eventTicketListQuery.data || []
  const eventList = eventListQuery.data || []

  return (
    <Flex flexDir="column" w="100%">
      <Text w="100%" fontSize="2xl" textAlign="center">
        Event Registration Page
      </Text>
      <Flex w="100%" justifyContent="center" alignItems="center">
        {
          eventList ? "No event yet, please stay tuned!" :
          eventTicketListQuery.isLoading ? "Loading..." :
          eventTicketListQuery.isError ? "Error" :
          eventTicketList ? <Box borderRadius="10px">
            <Table>
              <Thead>
                <Tr>
                  <Td w="5%">No.</Td>
                  <Td w="15%">Event Name</Td>
                  <Td w="10%">Event Date</Td>
                  <Td w="10%">Event Location</Td>
                  <Td w="10%">Participant Name</Td>
                  <Td w="10%">Status</Td>
                  <Td w="5%">View</Td>
                </Tr>
              </Thead>
              <Tbody>
                {eventTicketList.map((eventTicket, index) => (
                  <EventListRow eventTicket={eventTicket} num={index+1} key={eventTicket.id}/>
                ))}
              </Tbody>
            </Table>
          </Box>
          : "You have not registered any event yet"
        }
      </Flex>
    </Flex>
  );
};





