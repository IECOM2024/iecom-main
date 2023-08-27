import { Td, Tr } from "@chakra-ui/react";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import { EditEventTicketAdministrationModal } from "./EditEventTicketAdministrationModal";

interface EventTicketAdministrationRowProps {
  eventTicket: RouterOutputs["event"]["adminGetEventTicketList"]["data"][0];
    eventList: RouterOutputs["event"]["adminGetEventList"];
  editTicket: (
    data: RouterInputs["event"]["adminEditEventTicket"]
  ) => Promise<void>;
  deleteTicket: (
    data: RouterInputs["event"]["adminDeleteEventTicket"]
  ) => Promise<void>;
  num: number;
}

export const EventTicketAdministrationRow = ({
  eventTicket,
  editTicket,
  deleteTicket,
  eventList,
  num,
}: EventTicketAdministrationRowProps) => {
  return (
    <Tr>
      <Td>{num}</Td>
      <Td>{eventTicket.event.name}</Td>
      <Td>{eventTicket.participantName}</Td>
      <Td>{eventTicket.participantEmail}</Td>
      <Td>{eventTicket.participantPhoneNumber}</Td>
      <Td>{eventTicket.participantInstitution}</Td>
      <Td>{eventTicket.status}</Td>
      <Td><EditEventTicketAdministrationModal editEventTicket={editTicket} deleteEventTicket={deleteTicket} eventList={eventList} eventTicket={eventTicket}/></Td>
    </Tr>
  );
};
