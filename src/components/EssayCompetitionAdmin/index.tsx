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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { EssayRegistRow } from "./EssayRegistRow";
import { TRPCClientError } from "@trpc/client";
import { useToaster } from "~/utils/hooks/useToaster";
import { EssayCompetitionRegistrationData, RegistrationStatus } from "@prisma/client";
import { Loading } from "~/components/common/Loading";

export const EssayRegistAdministration = () => {
  const toaster = useToaster();
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(15);
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState(undefined);

  const [jumpInput, setJumpInput] = useState("1");

  const essayRegistQuery = api.essayRegist.adminGetessayRegistDataList.useQuery({
    currentPage: currentPage,
    limitPerPage: limitPerPage,
    filterBy: filterBy,
    searchQuery: searchQuery,
  });
  const essayRegistEditMutation =
    api.essayRegist.adminUpdateEssayRegistData.useMutation();
  const essayRegistDeleteMutation =
    api.essayRegist.adminDeleteEssayRegistData.useMutation();

  const essayRegistList = essayRegistQuery.data?.data ?? []
  const maxPage = Math.ceil(
    (essayRegistQuery.data?.metadata.total ?? 0) / limitPerPage
  );

  const nextPage = () => {
    let jump = currentPage + 1;
    if (jump > maxPage) {
      jump = 1;
    }
    setCurrentPage(jump);
  };
  const prevPage = () => {
    let jump = currentPage - 1;
    if (jump < 1) {
      jump = maxPage;
    }
    setCurrentPage(jump);
  };

  const jumpToPage = () => {
    const jumpInputInt = parseInt(jumpInput);
    if (jumpInputInt > maxPage) {
      setCurrentPage(maxPage);
      setJumpInput(maxPage.toString());
    } else if (jumpInputInt < 1) {
      setCurrentPage(1);
      setJumpInput("1");
    } else {
      setCurrentPage(jumpInputInt);
    }
  };

  const jumpChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJumpInput(e.target.value);
  };

  const editObject = async (newData: Partial<EssayCompetitionRegistrationData>) => {
    essayRegistEditMutation
      .mutateAsync({
        id: newData.id ?? "",
        name: newData.name ?? undefined,
        email: newData.email ?? undefined,
        phoneNumber: newData.phoneNumber ?? undefined,
        institution: newData.institution ?? undefined,
        major: newData.major ?? undefined,
        batch: newData.batch ?? undefined,
        postLink: newData.postLink ?? undefined,
        twibbonLink: newData.twibbonLink ?? undefined,
        whereDidYouKnowThisCompetitionInformation:
          newData.whereDidYouKnowThisCompetitionInformation ?? undefined,
        status: newData.status ?? RegistrationStatus.FORM_FILLING,
        
      })
      .then(async (result) => {
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        await essayRegistQuery.refetch();
      })
      .catch(async (error) => {
        if (!(error instanceof TRPCClientError)) throw error;
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        await essayRegistQuery.refetch();
      });
  };

  const deleteObject = (essayRegistTicketId: string) => {
    essayRegistDeleteMutation
      .mutateAsync({
        id: essayRegistTicketId,
      })
      .then((result) => {
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        if (!(error instanceof TRPCClientError)) throw error;
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  if (essayRegistQuery.isLoading) return <Loading/>;

  return (
    <Flex flexDir="column" px="1em" pt="2em" pb="10em">
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
          onChange={(e) => setLimitPerPage(parseInt(e.target.value))}
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

      {essayRegistList.length < 1 ? (
        <Text fontStyle="italic" fontSize="xl" color="gray.400">
          {" "}
          No Events
        </Text>
      ) : (
        <Box
          borderRadius="12px"
          overflow="hidden"
          mt="1em"
          borderRight="1px solid"
          borderLeft="1px solid"
          borderColor="gray.400"
        >
          <TableContainer>
            <Table w="100%" variant="black">
              <Thead>
                <Tr>
                  <Th w="10%">No.</Th>
                  <Th w="20%">Nama </Th>
                  <Th w="15%">Email</Th>
                  <Th w="15%">Phone Number</Th>
                  <Th w="15%">Status</Th>
                  <Th w="10%">View</Th>
                  <Th w="10%">Download Files</Th>
                  <Th w="10%">Message</Th>
                  <Th w="10%">Edit</Th>
                  <Th w="10%">Delete</Th>
                  <Th w="10%">Message</Th>
                  <Th w="10%">Edit</Th>
                  <Th w="10%">Delete</Th>
                  <Th w="10%">Msg</Th>
                </Tr>
              </Thead>
              <Tbody borderRadius="0 0 12px 12px">
                {essayRegistList.map((e, index) => (
                  <EssayRegistRow
                    key={index}
                    objectContent={e}
                    num={limitPerPage * (currentPage - 1) + index + 1}
                    editObject={editObject}
                    deleteObject={deleteObject}
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
              {`${currentPage}`}
            </MenuButton>
            <MenuList border="1px solid gray" p="1em">
              <Flex>
                <form onSubmit={jumpToPage}>
                  <Input value={jumpInput} onChange={jumpChangeHandler} />
                  <Button
                    variant="mono-outline"
                    w="8em"
                    ml="1em"
                    onClick={jumpToPage}
                  >
                    Jump
                  </Button>
                </form>
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
    </Flex>
  );
};
