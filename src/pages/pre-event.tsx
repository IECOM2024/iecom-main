import { Button, Flex, Image, Text, VStack, FlexProps, Box, useMediaQuery, HStack, Center, IconButton, ButtonGroup } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MdArrowDropDown } from "react-icons/md";
import { relative } from "path";

export const getStaticProps = async () => {
  return {  
    props: {},
  };
};

export default function EventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 600px)")[0];

  return (
    <PublicLayout>
      <Flex flexDir="column">
        <Text w="100%" fontSize="2xl">
          IECOM 2024 Event
        </Text>
        <Flex w="100%" justifyContent="center" alignItems="center">
          {
            "IECOM 2024 Eventis a Event held by Keluarga Mahasiswa Teknik Industri (MTI) ITB"
          }
        </Flex>
        <Flex w="100%" justifyContent="center" alignItems="center">
          {session?.user.role === "ADMIN" ? (
            <Button onClick={() => router.push("event-administration")} mt = "5vh" fontFamily ="Inter" color = "blue">
              Manage Event
            </Button>
          ) : (
            <Button onClick={() => router.push("event-registration")} mt = "5vh" fontFamily ="Inter" color = "blue">
              Register Now!
            </Button>
          )}
        </Flex>
      </Flex>
    </PublicLayout>
  );
};

const TimelineCard = ({
  title,
  top,
  date,
  left,
  isLower = false,
  ...props
}: FlexProps & { title: string; date: string; isLower?: boolean }) => {
  const topPos = !isLower
    ? 'calc(-1.75rem - .625rem/2)'
    : 'calc(12.5rem - 1.75rem - .625rem * 3/2)';
  return (
    <Flex
      direction={{ base: 'row', md: 'column' }}
      position='absolute'
      top={{
        base: top as string,
        md: topPos,
      }}
      left={{ md: left as string, base: 'calc(-1rem - 2px)' }}
      {...props}
      width='fit-content'
      alignItems='center'
      gap={{ base: '1rem', md: '0' }}
    >
      <Flex
        bgColor='white'
        borderRadius='50%'
        height={{ base: '2rem', md: '3.5rem' }}
        width={{ base: '2rem', md: '3.5rem' }}
      />
      <VStack
        spacing={0}
        align={{ base: 'flex-start', md: 'center' }}
      >
        <Text
          fontSize={fontSizes.md}
          fontWeight='semibold'
          color='blue'
          fontFamily='body'
        >
          {date}
        </Text>
        <Text
          fontSize={fontSizes.base}
          color='blue'
          fontFamily='Inter'
        >
          {title}
        </Text>
      </VStack>
    </Flex>
  );
};

const fontSizes = {
  xs: {
    base: '0.75rem',
    md: '1rem',
  },
  sm: {
    base: '0.875rem',
    md: '1.25rem',
  },
  base: {
    base: '1rem',
    md: '1.5rem',
  },
  md: {
    base: '1.15rem',
    md: '2rem',
  },
  lg: {
    base: '1.25rem',
    md: '2.5rem',
  },
  xl: {
    base: '1.5rem',
    md: '3rem',
  },
  xxl: {
    base: '1.75rem',
    md: '3.5rem',
  },
  xxxl: {
    base: '2rem',
    md: '4rem',
  },
};

const paddings = {
  xs: {
    base: '.75rem',
    md: '1rem',
  },
  sm: {
    base: '1rem',
    md: '2rem',
  },
  base: {
    base: '1.25rem',
    md: '3.5rem',
  },
  md: {
    base: '1.5rem',
    md: '4rem',
  },
  lg: {
    base: '1.75rem',
    md: '5rem',
  },
  xl: {
    base: '2rem',
    md: '6rem',
  },
  xxl: {
    base: '2.25rem',
    md: '7rem',
  },
  xxxl: {
    base: '2.5rem',
    md: '9rem',
  },
};

const timelineData = {
    date1: "20 September 2023",
    date2: "25 September 2023",
    date3: "25 October 2023",
    date4: "25 September 2023",
    date5: "20 September 2023",
    date6: "25 September 2023",
    date7: "25 October 2023",
    date8: "25 September 2023"
}

const PhaseName = {
    phase1: "Pre-Event 1",
    phase2: "Pre-Event 2",
    phase3: "Essay Competition",
    phase4: "Pre-Event 2",
    phase5: "Pre-Event 1",
    phase6: "Essay Competition",
    phase7: "Essay Competition",
    phase8: "Pre-Event 2"
}