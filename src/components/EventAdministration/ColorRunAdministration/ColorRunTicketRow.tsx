import { Button, Td, Tr } from "@chakra-ui/react";
import { RouterOutputs } from "~/utils/api";
import { downloadFile } from "~/utils/file";

interface ColorRunTicketRowProps {
  num: number;
  data: RouterOutputs["colorRun"]["adminGetColorRunTicketList"][0];
  proofFileUrl?: string | null;
}

export const ColorRunTicketRowProps = ({
  num,
  data,
  proofFileUrl,
}: ColorRunTicketRowProps) => {
  const downloadProofFile = () => {
    proofFileUrl && downloadFile(proofFileUrl);
  };

  return (
    <Tr>
      <Td>{num}</Td>
      <Td>{data.name}</Td>
      <Td>{data.email}</Td>
      <Td>{data.phoneNumber}</Td>
      <Td>{data.status}</Td>
      <Td>
        {proofFileUrl ? (
          <Button onClick={downloadProofFile}>Download</Button>
        ) : (
          "No Proof Uploaded"
        )}
      </Td>
      <Td><Button>Edit</Button></Td>
    </Tr>
  );
};
