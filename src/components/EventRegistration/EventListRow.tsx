import { Td, Tr } from "@chakra-ui/react";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { RouterOutputs } from "~/utils/api";

type EventTicketOutput = RouterOutputs["event"]["participantGetEventTicketList"][0];

interface EventListRowProps {
    eventTicket: EventTicketOutput;
    num: number
}

export const EventListRow = ({eventTicket,num} : EventListRowProps) => {
    const momentTime = moment(eventTicket.event.startTime)

    return <Tr>
        <Td>{num}</Td> 
        <Td>{eventTicket.event.name}</Td>
        <Td>{momentTime.format('DD-MM-YYYY')}</Td>
        <Td>{eventTicket.event.location}</Td>
        <Td>{eventTicket.participantName}</Td>
        <Td>{eventTicket.participantEmail}</Td>
        <Td>{eventTicket.status}</Td>
        <Td><MdEdit/></Td>
    </Tr>

}