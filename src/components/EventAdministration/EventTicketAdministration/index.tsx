import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddEventModal } from "../EventListAdministration/AddEventModal";
import { useState } from "react";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import { EventTicketAdministrationRow } from "./EventTicketAdministrationRow";

interface EventTicketAdministrationProps {
  eventTickets: RouterOutputs["event"]["adminGetEventTicketList"]["data"];
  eventTicketFn: {
    editTicket: (
      data: RouterInputs["event"]["adminEditEventTicket"]
    ) => Promise<void>;
    deleteTicket: (
      data: RouterInputs["event"]["adminDeleteEventTicket"]
    ) => Promise<void>;
  };
  eventTicketPageFn: {
    setPage: (page: number) => void;
    setLim: (lim: number) => void;
    setFilter: (filter: "ALL" | "EVENT" | "PARTICIPANT" | "STATUS") => void;
    setSearch: (search: string) => void;
  };
  rows: number;
  eventTicketPageValues: {
    page: number;
    lim: number;
  };
  eventList: RouterOutputs["event"]["adminGetEventList"];
}
export const EventTicketAdministration = ({
  eventTicketFn: { editTicket, deleteTicket },
  eventTicketPageFn: { setPage, setLim, setFilter, setSearch },
  rows,
  eventTickets,
  eventTicketPageValues: { page, lim },
  eventList
}: EventTicketAdministrationProps) => {
  const [jumpInput, setJumpInput] = useState<string>("1");
  const jumpChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJumpInput(e.target.value);
  };

  const maxPage = Math.ceil(rows / lim);

  const nextPage = () => {
    let jump = page + 1;
    if (jump > maxPage) {
      jump = 1;
    }
    setPage(jump);
  };
  const prevPage = () => {
    let jump = page - 1;
    if (jump < 1) {
      jump = maxPage;
    }
    setPage(jump);
  };

  const jumpToPage = () => {
    const jumpInputInt = parseInt(jumpInput);
    if (jumpInputInt > maxPage) {
      setPage(maxPage);
      setJumpInput(maxPage.toString());
    } else if (jumpInputInt < 1) {
      setPage(1);
      setJumpInput("1");
    } else {
      setPage(jumpInputInt);
    }
  };

  return (
    <Box p="1em">
      <Flex alignItems="center" mt="1em">
        <Select
          borderRadius="12"
          cursor="pointer"
          color="gray.500"
          borderWidth="2px"
          borderColor="gray.500"
          w="8em"
          _active={{
            bg: "rgba(47, 46, 46, 0.6)",
            shadow: "none",
          }}
          onChange={(e) => setLim(parseInt(e.target.value))}
          defaultValue={5}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Select>
        <Text ml="1em" fontWeight="bold" color="black">
          Records per page
        </Text>
      </Flex>

      {eventTickets.length < 1 ? (
        <Text fontStyle="italic" fontSize="xl" color="gray.400" textAlign="center" my="0.5em">
          No one registered yet
        </Text>
      ) : (
        <Box
          mt="1em"
        >
          <TableContainer>
            <Table w="100%" variant="black">
              <Thead>
                <Tr>
                  <Th w="10%">No.</Th>
                  <Th w="20%">Event Name</Th>
                  <Th w="20%">Name</Th>
                  <Th w="15%">Email</Th>
                  <Th w="10%">Phone Number</Th>
                  <Th w="15%">Institution</Th>
                  <Th w="10%">Status</Th>
                  <Th w="10%">Edit</Th>
                </Tr>
              </Thead>
              <Tbody borderRadius="0 0 12px 12px">
                {eventTickets
                  .map((ticket, idx) => (
                    <EventTicketAdministrationRow
                      eventTicket={ticket}
                      key={idx}
                      num={lim * (page - 1) + idx + 1}
                      editTicket={editTicket}
                      deleteTicket={deleteTicket}
                      eventList={eventList}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Flex
        justifyContent="space-between"
        alignItems={"center"}
        mt="1em"
        flexDir={{ base: "column", lg: "row-reverse" }}
      >
        <Flex justifyContent={{ base: "space-between", lg: "none" }}>
          <Button
            variant="mono-outline"
            w={{ base: "30%", lg: "4em" }}
            mr="1em"
            onClick={prevPage}
          >
            {"<"}
          </Button>
          <Menu>
            <MenuButton
              border="1px solid gray"
              borderRadius="12px"
              color="gray.600"
              w={{ base: "30%", lg: "4em" }}
            >
              {`${page}`}
            </MenuButton>
            <MenuList border="1px solid gray" p="1em">
              <Flex>
                <Input value={jumpInput} onChange={jumpChangeHandler} />
                <Button
                  variant="mono-outline"
                  w="8em"
                  ml="1em"
                  onClick={jumpToPage}
                >
                  Jump
                </Button>
              </Flex>
            </MenuList>
          </Menu>
          <Button
            variant="mono-outline"
            w={{ base: "30%", lg: "4em" }}
            ml="1em"
            onClick={nextPage}
          >
            {">"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
