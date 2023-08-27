import { useToast } from "@chakra-ui/react";

type voidFn = () => void | undefined;
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useToaster = () => {
  const toast = useToast();

  const toaster = (
    pr: Promise<any>,
    fns?: {
      thenFn?: voidFn;
      catchFn?: voidFn;
      finnalyFn?: voidFn;
    } | null
  ) => {
    const { thenFn, catchFn, finnalyFn } = fns ?? {
      thenFn: null,
      catchFn: null,
      finnalyFn: null,
    };

    pr.then((res) => {
      toast({
        title: "Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      thenFn && thenFn();
    })
      .catch((err: Error) => {
        if (err?.message) {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        catchFn && catchFn();
      })
      .finally(() => {
        finnalyFn && finnalyFn();
      });
  };

  return toaster;
};
