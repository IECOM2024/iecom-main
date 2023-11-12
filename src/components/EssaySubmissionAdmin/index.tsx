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
import { TRPCClientError } from "@trpc/client";
import { useToaster } from "~/utils/hooks/useToaster";
import {
  EssayCompetitionRegistrationData,
  RegistrationStatus,
} from "@prisma/client";
import { Loading } from "~/components/common/Loading";
import { EssaySubmisRow } from "./EssaySubmisRow";

export const EssaySubmisAdministration = () => {
  const toaster = useToaster();
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(15);
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState(undefined);

  const [jumpInput, setJumpInput] = useState("1");

  const essaySubmisQuery = api.essaySubmis.adminGetAllSubmissions.useQuery({
    page: currentPage,
    rowPerPage: limitPerPage,
    filterBy: filterBy,
    searchQuery: searchQuery,
  });

  const maxPage = Math.ceil(
    (essaySubmisQuery.data?.metadata.total ?? 0) / limitPerPage
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

  const essaySubmisList = essaySubmisQuery.data?.data ?? [];

  if (essaySubmisQuery.isLoading) return <Loading />;

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

      {essaySubmisList.length < 1 ? (
        <Text fontStyle="italic" fontSize="xl" color="gray.400">
          {" "}
          No Events
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
            essaySubmisList.length > 0
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
                  <Th w="20%">Nama </Th>
                  <Th w="15%">Email</Th>
                  <Th w="15%">Phone Number</Th>
                  <Th w="10%">Download Files</Th>
                  <Th w="6%">Last Submission</Th>
                </Tr>
              </Thead>
              <Tbody borderRadius="0 0 12px 12px">
                {essaySubmisList.map((e, index) => (
                  <EssaySubmisRow
                    key={e.id}
                    num={index + 1}
                    objectContent={e}
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
