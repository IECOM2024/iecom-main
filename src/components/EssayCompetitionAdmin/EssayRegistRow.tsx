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
  RegistrationStatus,
} from "@prisma/client";
import { MdEdit, MdLink, MdMessage } from "react-icons/md";
import { useDownloader } from "~/utils/hooks/useDownloader";
import { FolderEnum } from "~/utils/file";
import { useState } from "react";
import { EditEssayRegistModal } from "./EditEssayRegistModal";
import { useRouter } from "next/router";

interface ObjectListRowProps {
  objectContent: EssayCompetitionRegistrationData;
  num: number;
  editObject: (
    Object: Partial<EssayCompetitionRegistrationData>
  ) => Promise<void>;
  deleteObject: (ObjectId: string) => void;
}

export const EssayRegistRow = ({
  objectContent,
  num,
  editObject,
  deleteObject,
}: ObjectListRowProps) => {
  const { downloader, forceDownload } = useDownloader();
  const router = useRouter();
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
    if (!objectContent.fileUploadLink) return;

    router.push(objectContent.fileUploadLink)
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
      <Td>{objectContent.name}</Td>
      <Td>{objectContent.email}</Td>
      <Td>{objectContent.institution}</Td>
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
        <EditEssayRegistModal
          editObject={editObject}
          deleteObject={deleteObjectPipe}
          objectContent={objectContent}
        />
      </Td>
      <Td>
        {objectContent.fileUploadLink ? (
          <Button onClick={downloadFiles}>Download</Button>
        ) : (
          <Text fontStyle="italic">No File Uploaded</Text>
        )}
      </Td>

      <Td>
        {objectContent.twibbonLink ? (
          <a href={objectContent.twibbonLink} target="_blank" rel="noreferrer">
            <Flex w="100%" justifyContent="center">
              <MdLink size="2em" />
            </Flex>
          </a>
        ) : (
          <Text fontStyle="italic">No link</Text>
        )}
      </Td>
      <Td>
        {objectContent.postLink ? (
          <a href={objectContent.postLink} target="_blank" rel="noreferrer">
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
