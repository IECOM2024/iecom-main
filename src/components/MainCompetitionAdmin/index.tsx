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
import { CaseRegistRow } from "./CaseRegistRow";
import { TRPCClientError } from "@trpc/client";
import { useToaster } from "~/utils/hooks/useToaster";
import {
  EssayCompetitionRegistrationData,
  MainCompetitionRegistrationData,
  RegistrationStatus,
} from "@prisma/client";
import { Loading } from "~/components/common/Loading";

export const CaseRegistAdministration = () => {
  const toaster = useToaster();
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(15);
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState(undefined);

  const [jumpInput, setJumpInput] = useState("1");

  const caseRegistQuery = api.caseRegist.adminGetCaseRegistDataList.useQuery({
    currentPage: currentPage,
    limitPerPage: limitPerPage,
    filterBy: filterBy,
    searchQuery: searchQuery,
  });
  const caseRegistEditMutation =
    api.caseRegist.adminUpdateCaseRegistData.useMutation();
  const caseRegistDeleteMutation =
    api.caseRegist.adminDeleteCaseRegistData.useMutation();

  const caseRegistList = caseRegistQuery.data?.data ?? [];
  const maxPage = Math.ceil(
    (caseRegistQuery.data?.metadata.total ?? 0) / limitPerPage
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

  const editObject = async (
    newData: Partial<MainCompetitionRegistrationData>
  ) => {
    caseRegistEditMutation
      .mutateAsync({
        id: newData.id ?? "",
        teamName: newData.teamName ?? undefined,
        leaderName: newData.leaderName ?? undefined,
        leaderEmail: newData.leaderEmail ?? undefined,
        leaderPhoneNumber: newData.leaderPhoneNumber ?? undefined,
        leaderInstitution: newData.leaderInstitution ?? undefined,
        leaderMajor: newData.leaderMajor ?? undefined,
        leaderBatch: newData.leaderBatch ?? undefined,
        member1Name: newData.member1Name ?? undefined,
        member1Email: newData.member1Email ?? undefined,
        member1PhoneNumber: newData.member1PhoneNumber ?? undefined,
        member1Institution: newData.member1Institution ?? undefined,
        member1Major: newData.member1Major ?? undefined,
        member1Batch: newData.member1Batch ?? undefined,
        member2Name: newData.member2Name ?? undefined,
        member2Email: newData.member2Email ?? undefined,
        member2PhoneNumber: newData.member2PhoneNumber ?? undefined,
        member2Institution: newData.member2Institution ?? undefined,
        member2Major: newData.member2Major ?? undefined,
        member2Batch: newData.member2Batch ?? undefined,
        leaderPostLink: newData.leaderPostLink ?? undefined,
        member1PostLink: newData.member1PostLink ?? undefined,
        member2PostLink: newData.member2PostLink ?? undefined,
        leaderTwibbonLink: newData.leaderTwibbonLink ?? undefined,
        member1TwibbonLink: newData.member1TwibbonLink ?? undefined,
        member2TwibbonLink: newData.member2TwibbonLink ?? undefined,
        whereDidYouKnowThisCompetitionInformation:
          newData.whereDidYouKnowThisCompetitionInformation ?? undefined,
        status: newData.status ?? undefined,
      })
      .then(async (result) => {
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        await caseRegistQuery.refetch();
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
        await caseRegistQuery.refetch();
      });
  };

  const deleteObject = (caseRegistTicketId: string) => {
    caseRegistDeleteMutation
      .mutateAsync({
        id: caseRegistTicketId,
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

  if (caseRegistQuery.isLoading) return <Loading />;

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

      {caseRegistList.length < 1 ? (
        <Text fontStyle="italic" fontSize="xl" color="gray.400">
          {" "}
          No Registration
        </Text>
      ) : (
        <Box
          borderRadius="12px"
          overflow="scroll hidden"
          mt="1em"
          borderRight="1px solid"
          borderLeft="1px solid"
          borderColor="gray.400"
          mb="1em"
          sx={
            caseRegistList.length > 0
              ? {
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                    height: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    border: "1px solid slategrey",
                    borderRadius: "12px",
                  },
                }
              : {}
          }
          className="darkscroll"
        >
          <TableContainer>
            <Table w="100%" variant="black">
              <Thead>
                <Tr>
                  <Th w="10%">No.</Th>
                  <Th w="10%">Team Name</Th>
                  <Th w="10%">Leader Name</Th>
                  <Th w="10%">Leader Institution</Th>
                  <Th w="10%">Leader Email</Th>
                  <Th w="10%">Member 1 Name</Th>
                  <Th w="10%">Member 2 Name</Th>
                  <Th w="15%">Status</Th>
                  <Th w="10%">View</Th>
                  <Th w="10%">Download Files</Th>
                  <Th w="6%">Le Twib Link</Th>
                  <Th w="6%">Le Post Link</Th>
                  <Th w="6%">M1 Twib Link</Th>
                  <Th w="6%">M1 Post Link</Th>
                  <Th w="6%">M2 Twib Link</Th>
                  <Th w="6%">M2 Post Link</Th>
                  <Th w="10%">Msg</Th>
                </Tr>
              </Thead>
              <Tbody borderRadius="0 0 12px 12px">
                {caseRegistList.map((e, index) => (
                  <CaseRegistRow
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
