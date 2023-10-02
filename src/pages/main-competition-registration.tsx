import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import {
  MainCompParticipantForm,
  MainCompRegistrationFormValues,
} from "~/components/main-competititon-registration/MemberRegistrationModal";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ force: true });

export default function MainCompetitionRegistrationPage() {
  const { data: session } = useSession();

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const studentCardState1 = useState<File | null | undefined>(null);
  const pictureState1 = useState<File | null | undefined>(null);
  const studentCardState2 = useState<File | null | undefined>(null);
  const pictureState2 = useState<File | null | undefined>(null);
  const studentCardState3 = useState<File | null | undefined>(null);
  const pictureState3 = useState<File | null | undefined>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MainCompRegistrationFormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <AuthorizedRoleLayout session={session}>
      <Flex
        color="whiteCream"
        flexDir="column"
        border="0.5px solid black"
        borderRadius="20px"
        w="min(55em,90%)"
        mt="5em"
        mx="auto"
      >
        <Text
          fontSize="5xl"
          color="blue"
          fontWeight="bold"
          textAlign="center"
          mt="1em"
        >
          Main Competition Registration
        </Text>
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          w="100%"
          mt="2em"
        >
          <Text fontSize="3xl" color="blue" fontWeight="bold">
            Team Information
          </Text>
          <form onSubmit={onSubmit}>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Team Name
                      </Text>
                      <Input {...register("teamName", { required: true })} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        University Name
                      </Text>
                      <Input
                        {...register("universityName", { required: true })}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        University Country
                      </Text>
                      <Input
                        {...register("universityCountry", { required: true })}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              borderBottom="1px solid black"
              mt="1em"
            >
              Member Information
            </Text>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td color="blue" fontSize="1.3em">
                      {getValues("participants.0.firstName")
                        ? getValues("participants.0.firstName") +
                          getValues("participants.1.lastName")
                        : "First Member"}
                    </Td>
                    <Td>
                      <MainCompParticipantForm
                        index={0}
                        studentCardState={studentCardState1}
                        pictureState={pictureState1}
                        register={register}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td color="blue" fontSize="1.3em">
                      {getValues("participants.1.firstName")
                        ? getValues("participants.1.firstName") +
                          getValues("participants.1.lastName")
                        : "Second Member"}
                    </Td>
                    <Td>
                      <MainCompParticipantForm
                        index={1}
                        studentCardState={studentCardState2}
                        pictureState={pictureState2}
                        register={register}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td color="blue" fontSize="1.3em">
                      {getValues("participants.2.firstName")
                        ? getValues("participants.2.firstName") +
                          getValues("participants.2.lastName")
                        : "Third Member"}
                    </Td>
                    <Td>
                      <MainCompParticipantForm
                        index={2}
                        studentCardState={studentCardState3}
                        pictureState={pictureState3}
                        register={register}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text
              textAlign="center"
              fontSize="3xl"
              color="blue"
              fontWeight="bold"
              borderBottom="1px solid black"
              mt="1em"
            >
              Payment Information
            </Text>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text color="blue" fontWeight="bold">
                        Proof of Payment
                      </Text>
                      <Input
                        type="file"
                        onChange={(e) =>
                          setPaymentProof(e.target.files?.[0] ?? null)
                        }
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </form>
        </Flex>
      </Flex>
    </AuthorizedRoleLayout>
  );
}
