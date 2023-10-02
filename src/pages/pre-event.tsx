import { Button, Flex, Image, Text, VStack, FlexProps, Box, useMediaQuery, Center, Img } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
      <Flex flexDir="column" w="100%" pos="relative">
        <Flex bgImage='preevent-1.webp'>
          <Flex flexDir="column" w="80%" mt="12rem" ml="4.5em" mb = "10em">
              <Text
                w="100%"
                fontSize="7xl"
                fontFamily="body"
                color="blue"
                fontWeight="bold"
              >
                Pre-Event
              </Text>
              <Text
                w="100%"
                fontFamily="Inter"
                color="blue"
                fontSize="lg"
                fontWeight="bold"
                wordBreak="normal"
              >
                Lorem ipsum dolor sit amet consectetur. Eget ultrices lobortis 
                consequat morbi sodales sollicitudin tristique faucibus. Nunc 
                commodo mi dolor ipsum odio in cras. Eu posuere libero tristique 
                praesent nunc sit mollis. Gravida mi vulputate massa in mauris 
                tortor bibendum tincidunt.
              </Text>
  {//<Text fontWeight ="Regular" color = "blue" mr = "60vh" fontSize="2xl" fontFamily="Inter"></Text>
  }
        <Flex w="100%">
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
        </Flex>
        <Flex marginTop="10vh">
            <Text fontSize="7xl" fontWeight = "bold" color="blue" textAlign="center" w = "100%">
               Timeline
            </Text>
        </Flex>
        {/* Third Section */}
          <VStack
            color='blue'
            spacing={{ base: '1rem', md: '3rem' }}
            width='100%'
            mb={{ base: '2rem', md: '4rem' }}
          >
            <Flex
              position='relative'
              borderRight={{ base: 'none', md: 'solid #054E83' }}
              borderLeft={{ md: 'none', base: 'solid #054E83' }}
              borderBlock={{ base: 'none', md: 'solid #054E83' }}
              borderWidth={{ base: '4px', md: '.625rem' }}
              width='78%'
              height={{ base: '35rem', md: '12.5rem' }}
              mt = "5em"
              ml = "6em"
            >
              {Object.keys(timelineData).map((keys, index) => (
  <TimelineCard
    key={index}
    title= {PhaseName[`phase${index+1}`]}
    date={timelineData[`date${index+1}`]} 
    top={`calc(${index * 5}rem - 1rem)`}
    left={`calc(${
      (index - 4 * Math.floor(index / 4)) * 18
    }rem - 8rem)`}
    isLower={index > 3}
  />
))}
            </Flex>
          </VStack>
          <Flex mt = "10em" mb = "20em" justifyContent='center'flexWrap='wrap' w = '100%'>
              <Box  justifyContent='center'  bg='#FFF7E7'fontFamily = "Inter" p={10} color = 'black' borderRadius='md'>
                <Text color = 'blue' fontSize='3xl' fontFamily='Inter' fontWeight='medium'>
                  IECOM Series Episode 1:
                </Text>
                <Text color = 'blue' fontSize='5xl' fontFamily='ebgar' fontWeight='bold'>
                  Behind The Success of A Social Entrepreneurship
                </Text>
                <Flex position = 'absolute'>
                <Text  fontSize = '1xl' color = 'blue' fontFamily='Inter' fontWeight='medium'>
                Lorem ipsum dolor sit amet consectetur. 
                Eget ultrices lobortis consequat morbi sodales sollicitudin tristique faucibus. 
                Nunc commodo mi dolor ipsum odio in cras. 
                Eu posuere libero tristique praesent nunc sit mollis. 
                Gravida mi vulputate massa in mauris tortor bibendum.
                </Text>
                </Flex>
                <Flex justifyContent='flex-end'>
<Box position = 'relative'>
  <Image
    src="vector-1.webp"
    alt="Image 1"
    position='relative'
   />
  <Image
    src="rectangle-25.webp"
    alt="Image 2"
    position='absolute'
    top ="-1.2em"
    left="1.1em"
  />
</Box>
                </Flex>
              </Box>
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
interface timelineData {
  [key: string]: string;
}

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

interface PhaseName{
  [key: string]: string;
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