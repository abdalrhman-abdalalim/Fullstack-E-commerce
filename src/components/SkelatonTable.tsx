import { Stack, Skeleton, Flex } from "@chakra-ui/react";

interface IProps{

}
const SkelatonTable = ({}:IProps)=>{
  return (
    <Stack maxW={"90%"} mx={"auto"} my={5}>
      {Array.from({ length: 10 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          h={"50px"}
          rounded={"md"}
          p={"5px"}
        >
          <Skeleton h={"9px"} w={"70px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"70px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"70px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"70px"} bg={"gray"} />
          <Skeleton h={"9px"} w={"70px"} bg={"gray"} />

          <Flex>
            <Skeleton
              h={"30px"}
              w={"50px"}
              startColor="red.300"
              endColor="red.500"
              mr={4}
            />
            <Skeleton
              h={"30px"}
              w={"50px"}
              startColor="blue.300"
              endColor="blue.500"
              mr={4}
            />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}
export default SkelatonTable