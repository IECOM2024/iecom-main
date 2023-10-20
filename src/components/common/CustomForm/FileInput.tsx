import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { AllowableFileTypeEnum, downloadFile } from "~/utils/file";
import FileSaver from "file-saver";

export interface FileInputProps {
  fileStateArr: [
    File | null | undefined,
    React.Dispatch<React.SetStateAction<File | null | undefined>>
  ];
  imgUrl?: string;
}

export const FileInput = ({
  fileStateArr,
  imgUrl,
  ...rest
}: FileInputProps) => {
  const [fileState, setFileState] = fileStateArr;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileState(e.target.files[0]);
    }
  };

  const downloadTheFile = () => {
    imgUrl &&
      downloadFile(imgUrl).then((data) => FileSaver.saveAs(data, data.name));
  };

  return (
    <label style={{ cursor: "pointer" }}>
      <Input
        {...rest}
        type="file"
        onChange={fileChangeHandler}
        color={"transparent"}
        h="4em"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={"file-input-default"}
        cursor="pointer"
        accept={AllowableFileTypeEnum.PICTURES}
      />
      {imgUrl && (
        <>
          <Text color="blue" w="100%" textAlign="center" mt="1em">
            You have uploaded a file
          </Text>
          <Button onClick={downloadTheFile} variant="mono-outline" w="100%">
            Download My File
          </Button>
        </>
      )}
    </label>
  );
};
