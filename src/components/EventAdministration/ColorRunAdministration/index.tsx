import { Flex, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { api } from "~/utils/api";

export const ColorRunAdministration = () => {
  const ticketListQuery = api.colorRun.adminGetColorRunTicketList.useQuery();
  const ticketList = ticketListQuery.data;

  const ticketUpdateMutation = api.colorRun.adminUpdateColorRunTicket.useMutation();
  const ticketDeleteMutation = api.colorRun.adminDeleteColorRunTicket.useMutation();

  if (ticketListQuery.isLoading)
    return (
      <Flex
        flexDir="column"
        w="min(55em,90%)"
        justifyContent="center"
        bg="whiteCream"
        borderRadius="10px"
        my="2em"
        mx="auto"
        p="4rem"
      >
        <Text color="blue" fontSize="xl">
          Loading...
        </Text>
      </Flex>
    );

  return (
    <Flex
      flexDir="column"
      w="min(55em,90%)"
      justifyContent="center"
      bg="whiteCream"
      borderRadius="10px"
      my="2em"
      mx="auto"
      p="4rem"
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Td>No.</Td>
              <Td>Name</Td>
              <Td>Email</Td>
              <Td>Phone Number</Td>
              <Td>Status</Td>
              <Td>Proof of Payment</Td>
            </Tr>
          </Thead>
          <Tbody>
            
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
