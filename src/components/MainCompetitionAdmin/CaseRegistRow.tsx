import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
  Input,
} from "@chakra-ui/react";
import {
  EssayCompetitionRegistrationData,
  MainCompetitionRegistrationData,
  RegistrationStatus,
} from "@prisma/client";
import { MdEdit, MdLink, MdMessage } from "react-icons/md";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { FolderEnum } from "~/utils/file";
import { useState } from "react";
import { EditCaseRegistModal } from "./EditCaseRegistModal";

interface ObjectListRowProps {
  objectContent: MainCompetitionRegistrationData;
  num: number;
  editObject: (
    Object: Partial<MainCompetitionRegistrationData>
  ) => Promise<void>;
  deleteObject: (ObjectId: string) => void;
}

export const CaseRegistRow = ({
  objectContent,
  num,
  editObject,
  deleteObject,
}: ObjectListRowProps) => {
  const { downloader, forceDownload } = useDownloader();
  const toast = useToast();

  const [status, setStatus] = useState<RegistrationStatus>(
    objectContent.status
  );

  const [msgInput, setMsgInput] = useState("");
  const msgInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgInput(e.target.value);
  };

  const rejectSumission = () => {
    if (msgInput === "") {
      return toast({
        title: "Message Empty",
        description: "Please enter a message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    editObject({
      status: RegistrationStatus.FORM_FILLING,
      id: objectContent.id,
      messageFromAdmin: msgInput,
    }).then(() => {
      toast({
        title: "Registration Rejected",
        description: "Status changed to FORM_FILLING",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const addMsg = () => {
    if (msgInput === "") {
      return toast({
        title: "Message Empty",
        description: "Please enter a message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    editObject({
      messageFromAdmin: msgInput,
      id: objectContent.id,
    }).then(() => {
      toast({
        title: "Message Added",
        description: "Message added to the participant",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const deleteObjectPipe = () => {
    deleteObject(objectContent.id);
  };

  const downloadFiles = () => {
    if (!objectContent.isFilePaymentUploaded) {
      return;
    }

    if (
      !(
        objectContent.status === RegistrationStatus.SUBMITTED_UNCONFIRMED ||
        objectContent.status === RegistrationStatus.SUBMITTED_CONFIRMED ||
        objectContent.status === RegistrationStatus.FORM_FILLING
      )
    ) {
      return;
    }

    downloader({
      folder: FolderEnum.COLOR_RUN_PROOF,
      filename: `${objectContent.id}.zip`,
    }).then(({ url }) => forceDownload(url, `${objectContent.teamName}.zip`));
  };

  const onChangeStatus = (newStatus: RegistrationStatus) => () => {
    setStatus(newStatus);
    editObject({ status: newStatus, id: objectContent.id }).then(() => {
      if (newStatus === RegistrationStatus.SUBMITTED_CONFIRMED) {
        toast({
          title: "Status Changed",
          description: "Status changed to SUBMITTED_CONFIRMED",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      if (newStatus === RegistrationStatus.SUBMITTED_UNCONFIRMED) {
        toast({
          title: "Status Changed",
          description: "Status changed to SUBMITTED_UNCONFIRMED",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      if (newStatus === RegistrationStatus.FORM_FILLING) {
        toast({
          title: "Status Changed",
          description: "Status changed to FORM_FILLING",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };
  return (
    <Tr>
      <Td>{num}</Td>
      <Td>{objectContent.teamName}</Td>
      <Td>{objectContent.leaderName}</Td>
      <Td>{objectContent.leaderInstitution}</Td>
      <Td>{objectContent.leaderEmail}</Td>
      <Td>{objectContent.member1Name}</Td>
      <Td>{objectContent.member2Name}</Td>
      <Td>
        <Menu>
          <MenuButton
            bg="none"
            border={
              status === RegistrationStatus.FORM_FILLING
                ? "1.5px solid blue"
                : status === RegistrationStatus.SUBMITTED_UNCONFIRMED
                ? "1.5px solid black"
                : status === RegistrationStatus.SUBMITTED_CONFIRMED
                ? "1.5px solid green"
                : undefined
            }
            p="0.5em"
          >
            {status}
          </MenuButton>
          <MenuList as={Flex} flexDir="column" gap="1em" p="1em">
            <Button
              bg="blue"
              color="white"
              onClick={onChangeStatus(RegistrationStatus.FORM_FILLING)}
            >
              FORM_FILLING
            </Button>
            <Button
              bg="gray"
              color="white"
              onClick={onChangeStatus(RegistrationStatus.SUBMITTED_UNCONFIRMED)}
            >
              SUBMITTED_UNCONFIRMED
            </Button>
            <Button
              bg="green.100"
              onClick={onChangeStatus(RegistrationStatus.SUBMITTED_CONFIRMED)}
            >
              SUBMITTED_CONFIRMED
            </Button>
          </MenuList>
        </Menu>
      </Td>

      <Td>
        <EditCaseRegistModal
          editObject={editObject}
          deleteObject={deleteObjectPipe}
          objectContent={objectContent}
        />
      </Td>
      <Td>
        {objectContent.isFilePaymentUploaded ? (
          <Button onClick={downloadFiles}>Download</Button>
        ) : (
          <Text fontStyle="italic">No File Uploaded</Text>
        )}
      </Td>

      <Td>
        {objectContent.leaderTwibbonLink ? (
          <a href={objectContent.leaderTwibbonLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.leaderPostLink ? (
          <a href={objectContent.leaderPostLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.member1TwibbonLink ? (
          <a href={objectContent.member1TwibbonLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.member1PostLink ? (
          <a href={objectContent.member1PostLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.member2TwibbonLink ? (
          <a href={objectContent.member2TwibbonLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.member2PostLink ? (
          <a href={objectContent.member2PostLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      
      <Td>
        <Menu>
          <MenuButton as={Button}>
            <MdMessage fontSize="2rem" />
          </MenuButton>
          <MenuList as={Flex} flexDir="column" gap="1em" p="1em">
            <Input value={msgInput} onChange={msgInputOnChange} w="20em" />
            <Button bg="salmon" onClick={rejectSumission}>
              Reject Submission
            </Button>
            <Button bg="blue" color="white" onClick={addMsg}>
              Add Message
            </Button>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};
