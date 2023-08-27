import { Td, Tr } from "@chakra-ui/react";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import { EditEventRegistrationModal } from "./EditEventTicketModal";

type EventTicketOutput = RouterOutputs["event"]["participantGetEventTicketList"][0];

interface EventListRowProps {
    eventTicket: EventTicketOutput;
    eventList: RouterOutputs["event"]["participantGetEventList"];
    editEventTicket: (data: RouterInputs["event"]["participantEditEventTicket"]) => Promise<void>;
    num: number
    deleteEventTicket: (data: RouterInputs["event"]["participantDeleteEventTicket"]) => Promise<void>;
}

export const EventTicketListRow = ({eventTicket,num, eventList, editEventTicket, deleteEventTicket} : EventListRowProps) => {
    const momentTime = moment(eventTicket.event.startTime)

    return <Tr>
        <Td>{num}</Td> 
        <Td>{eventTicket.event.name}</Td>
        <Td>{momentTime.format('DD-MM-YYYY')}</Td>
        <Td>{eventTicket.event.location}</Td>
        <Td>{eventTicket.participantName}</Td>
        <Td>{eventTicket.status}</Td>
        <Td><EditEventRegistrationModal deleteEventTicket={deleteEventTicket} eventList={eventList} eventTicket={eventTicket} editEventTicket={editEventTicket}/></Td>
    </Tr>

}