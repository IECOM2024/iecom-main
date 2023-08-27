import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { RouterInputs, api } from "~/utils/api";
import { useToaster } from "~/utils/hooks/useToaster";
import { useState } from "react";
import { EventListAdministration } from "./EventListAdministration";
import { EventTicketAdministration } from "./EventTicketAdministration";

export const EventAdministration = () => {
  const toaster = useToaster();

  const eventListQuery = api.event.adminGetEventList.useQuery();
  const addEventMutation = api.event.adminCreateEvent.useMutation();
  const updateEventMutation = api.event.adminEditEvent.useMutation();

  const [eventTicketPage, setEventTicketPage] = useState(1);
  const [eventTicketLim, setEventTicketLim] = useState(10);
  const [eventTicketFilter, setEventTicketFilter] = useState<
    "ALL" | "EVENT" | "PARTICIPANT" | "STATUS"
  >("ALL");
  const [eventTicektSearch, setEventTicketSearch] = useState<string>("");

  const eventTicketListQuery = api.event.adminGetEventTicketList.useQuery({
    currentPage: eventTicketPage,
    limitPerPage: eventTicketLim,
    filterBy: eventTicketFilter,
    searchQuery: eventTicektSearch,
  });

  const editTicketMutation = api.event.adminEditEventTicket.useMutation();
  const deleteTicketMutation = api.event.adminDeleteEventTicket.useMutation();

  const eventList = eventListQuery.data ?? [];
  const eventTicketList = eventTicketListQuery.data?.data ?? [];
  const eventTicketRows = eventTicketListQuery.data?.metadata.rows ?? 0;

  const eventFn = {
    addEvent: async (data: RouterInputs["event"]["adminCreateEvent"]) => {
        console.log("NICE")

      toaster(addEventMutation.mutateAsync(data), {
        thenFn: () => {
          eventListQuery.refetch();
        },
      });
    },

    updateEvent: async (data: RouterInputs["event"]["adminEditEvent"]) => {
      toaster(updateEventMutation.mutateAsync(data), {
        thenFn: () => {
          eventListQuery.refetch();
        },
      });
    },
  };

  const eventTicketFn = {
    editTicket: async (data: RouterInputs["event"]["adminEditEventTicket"]) => {
      toaster(editTicketMutation.mutateAsync(data), {
        thenFn: () => {
          eventTicketListQuery.refetch();
        },
      });
    },

    deleteTicket: async (
      data: RouterInputs["event"]["adminDeleteEventTicket"]
    ) => {
      toaster(deleteTicketMutation.mutateAsync(data), {
        thenFn: () => {
          eventTicketListQuery.refetch();
        },
      });
    },
  };

  const eventTicketPageFn = {
    setPage: (page: number) => {
      setEventTicketPage(page);
    },
    setLim: (lim: number) => {
      setEventTicketLim(lim);
    },
    setFilter: (filter: "ALL" | "EVENT" | "PARTICIPANT" | "STATUS") => {
      setEventTicketFilter(filter);
    },
    setSearch: (search: string) => {
      setEventTicketSearch(search);
    },
  };

  const eventTicketPageValues = {
    page: eventTicketPage,
    lim: eventTicketLim,
  } 

  return (
    <Flex flexDir="column" w="100%">
      <Text
        w="100%"
        fontSize="3xl"
        textAlign="center"
        borderBottom="1px solid black"
      >
        Event Administration Page
      </Text>
      <Text w="100%" fontSize="xl" textAlign="center" mt="1em">
        Event List
      </Text>
      <EventListAdministration eventFn={eventFn} eventList={eventList}/>
      <Box bg="black" h="1px" w="100%" mt="2.5em" />
      <Text w="100%" fontSize="xl" textAlign="center" mt="1em">
        Ticket List
      </Text>
        <EventTicketAdministration
            eventTicketFn={eventTicketFn}
            eventTicketPageFn={eventTicketPageFn}
            eventTicketPageValues={eventTicketPageValues}
            eventTickets={eventTicketList}
            rows={eventTicketRows}
            eventList={eventList}
        />
    </Flex>
  );
};
