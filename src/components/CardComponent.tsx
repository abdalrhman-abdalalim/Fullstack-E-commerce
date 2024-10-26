import {
  Card,
  Image,
  Stack,
  Heading,
  CardBody,
  Text,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IProduct } from "../interfaces/index";

const CardComponent = (attributes: IProduct) => {
  const { colorMode } = useColorMode();

  return (
    <Card
      bg={"transparent"}
      border={"1px solid #a8b5c8"}
      mx={"auto"}
      maxW={"250px"}
    >
      <CardBody>
        <Image
          src={`${attributes.thumbnail.url}`}
          alt={attributes.title}
          boxSize={150}
          rounded={"50%"}
          mx={"auto"}
        />
        <Stack mt="6" spacing="3">
          <Heading textAlign={"center"} size="md">
            {attributes.title}
          </Heading>
          <Text fontSize={"14px"} textAlign={"center"}>
            This sofa is perfect for modern tropical spaces, baroque-inspired
            spaces, earthy toned
          </Text>
          <Text
            color={"purple.600"}
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            ${attributes.price}
          </Text>
          <Button
            as={NavLink}
            to={`/products/${attributes.documentId}`}
            color={colorMode === "dark" ? "black" : "white"}
            bg={colorMode === "dark" ? "#e6f3fd" : "#9f7aea"}
            _hover={{
              bg: colorMode === "dark" ? "purple.300" : "purple.800",
              color: colorMode === "dark" ? "white" : "black",
            }}
            fontSize="2xl"
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
