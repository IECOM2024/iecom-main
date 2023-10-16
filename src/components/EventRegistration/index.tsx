import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RouterInputs, api } from "~/utils/api";
import { EventTicketListRow } from "./EventTicketListRow";
import { EventRegistrationModal } from "./EventRegistrationModal";
import { useToaster } from "~/utils/hooks/useToaster";
import { useIsMobile } from "~/utils/hooks/useIsMobile";
import { useUploader } from "~/utils/hooks/useUploader";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import React, { Dispatch, SetStateAction } from "react";

interface EventRegistrationProps {
  eventType?: string;
}

export const EventRegistration = ({ eventType }: EventRegistrationProps) => {
  const toaster = useToaster();
  const { uploader } = useUploader();
  const { downloader } = useDownloader();
  const isMobile = useIsMobile();

  const eventTicketListQuery =
    api.event.participantGetEventTicketList.useQuery();
  const eventListQuery = api.event.participantGetEventList.useQuery();
  const createEventMutation =
    api.event.participantCreateEventTicket.useMutation();
  const editEventMutation = api.event.participantEditEventTicket.useMutation();
  const deleteEventMutation =
    api.event.participantDeleteEventTicket.useMutation();

  const eventTicketList = eventTicketListQuery.data ?? [];
  const eventList = eventListQuery.data ?? [];

  const registerEvent = async (
    data: RouterInputs["event"]["participantCreateEventTicket"]
  ) => {
    toaster(createEventMutation.mutateAsync(data), {
      thenFn: () => {
        eventTicketListQuery.refetch();
      },
    });
  };

  const editEventTicket = async (
    data: RouterInputs["event"]["participantEditEventTicket"]
  ) => {
    toaster(editEventMutation.mutateAsync(data), {
      thenFn: () => {
        eventTicketListQuery.refetch();
      },
    });
  };

  const deleteEventTicket = async (
    data: RouterInputs["event"]["participantDeleteEventTicket"]
  ) => {
    toaster(deleteEventMutation.mutateAsync(data), {
      thenFn: () => {
        eventTicketListQuery.refetch();
      },
    });
  };

  const uploadColorRunPayment = (file: File, eventTicketId: string) => {
    toaster(
      uploader(
        `${eventTicketId}.png`,
        FolderEnum.COLOR_RUN_PROOF,
        AllowableFileTypeEnum.PNG,
        file
      )
    );
  };

  const downloadColorRunPayment = (
    eventTicketId: string,
    setState: Dispatch<SetStateAction<string | null | undefined>>
  ) => {
    downloader({
      folder: FolderEnum.COLOR_RUN_PROOF,
      filename: `${eventTicketId}.png`,
    }).then(({ url }) => {
      setState(url);
    });
  };

  return (
    <Flex
      fontSize="4xl"
      h="90vh"
      mt="1em"
      color="brown.3"
      fontWeight="bold"
      fontFamily="heading"
      w="100%"
      textAlign="center"
      ml="1em"
    >
      Please Wait, We Are Creating Something Special For You!
    </Flex>
  );

  return (
    <Flex flexDir="column" w="100%">
      <Text w="100%" fontSize="2xl" textAlign="center">
        Event Registration Page
      </Text>
      <Flex w="100%" justifyContent="center" alignItems="center">
        {!eventList ? (
          "No event yet, please stay tuned!"
        ) : eventTicketListQuery.isLoading ? (
          "Loading..."
        ) : eventTicketListQuery.isError ? (
          "Error"
        ) : eventTicketList.length > 0 ? (
          isMobile ? (
            <Box borderRadius="10px" px="1em">
              <TableContainer>
                <Table variant="black" w="100%">
                  <Thead>
                    <Tr>
                      <Td w="50%">Event Name</Td>
                      <Td w="30%">Status</Td>
                      <Td w="20%">View</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {eventTicketList.map((eventTicket, index) => (
                      <EventTicketListRow
                        eventTicket={eventTicket}
                        editEventTicket={editEventTicket}
                        deleteEventTicket={deleteEventTicket}
                        eventList={eventList}
                        num={index + 1}
                        key={eventTicket.id}
                        isMobile={isMobile}
                        uploadColorRunPayment={uploadColorRunPayment}
                        downloadColorRunPayment={downloadColorRunPayment}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box borderRadius="10px" px="1em">
              <TableContainer>
                <Table variant="black" w="100%">
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
                      <EventTicketListRow
                        eventTicket={eventTicket}
                        editEventTicket={editEventTicket}
                        deleteEventTicket={deleteEventTicket}
                        eventList={eventList}
                        num={index + 1}
                        key={eventTicket.id}
                        uploadColorRunPayment={uploadColorRunPayment}
                        downloadColorRunPayment={downloadColorRunPayment}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )
        ) : (
          "You have not registered any event yet"
        )}
      </Flex>
      <Flex w="100%" justifyContent="center" alignItems="center" mt="1em">
        <EventRegistrationModal
          registerEvent={registerEvent}
          eventList={eventList}
          eventType={eventType}
          uploadColorRunPayment={uploadColorRunPayment}
          downloadColorRunPayment={downloadColorRunPayment}
        />
      </Flex>
    </Flex>
  );
};
