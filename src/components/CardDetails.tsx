import {
  Card,
  CardBody,
  Flex,
  Heading,
  Button,
  Image,
  Stack,
  Text,
  Box,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "./BackArrow";
import { axiosInstance } from "../api/api.config";
import { addToCart } from "../app/features/cart/cartSlice";
import { useAppDispatch } from "../app/store";

interface IProps {}

const CardDetails = ({}: IProps) => {
  const { id: documentId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getProductData = async () => {
    try {
      const { data } = await axiosInstance.get(`/products/${documentId}`, {
        params: {
          populate: "thumbnail",
          fields: "title,price,description",
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { isLoading, isError, data } = useQuery(
    ["products", documentId],
    getProductData
  );

  const goBack = () => {
    navigate(-1);
  };

  const onAddToCartHandler = () => {
    dispatch(addToCart(data));
  };

  if (isError) {
    return <div>Error fetching product details. Please try again later.</div>;
  }

  const bg = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("#e6f3fd", "purple.500");

  if (isLoading) {
    return (
      <Box
        height={"340px"}
        bg={bg}
        p={4}
        maxW={"350px"}
        minW={"50px"}
        mx={"auto"}
        mt={"70px"}
      >
        <Skeleton mx={"auto"} height={"200px"} w={"full"} />
        <SkeletonText
          mt="4"
          noOfLines={1}
          spacing={"4"}
          mx={"auto"}
          maxW={"250px"}
        />
        <SkeletonText mt="4" noOfLines={1} spacing={"4"} />
        <SkeletonText
          mt="4"
          noOfLines={1}
          spacing={"4"}
          mx={"auto"}
          maxW={"250px"}
        />
        <Skeleton
          width={"320px"}
          height={"30px"}
          rounded={"10px"}
          mt={"10px"}
          mx={"auto"}
        />
      </Box>
    );
  }

  const attributes = data;
  if (!attributes) {
    return <div>No product found!</div>;
  }

  return (
    <div>
      <Flex display="block" alignItems="center">
        <Flex
          w="1200px"
          mx="auto"
          alignItems="center"
          maxW="sm"
          my={4}
          cursor="pointer"
          fontWeight="bold"
          onClick={goBack}
          justify="flex-start"
        >
          <BackArrow />
          <Text ml="9px">Back</Text>
        </Flex>
        <Card
          bg="transparent"
          border="1px solid #a8b5c8"
          mx="auto"
          maxW="380px"
          minW="50px"
        >
          <CardBody>
            <Image
              src={`${attributes.thumbnail.url}`}
              alt={attributes.title}
              mx="auto"
              height="250px"
              w="full"
            />
            <Stack mt="6" spacing="3">
              <Heading textAlign="center" size="md">
                {attributes.title}
              </Heading>
              <Text fontSize="14px" textAlign="center">
                {attributes.description}
              </Text>
              <Text
                color="purple.600"
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
              >
                ${attributes.price}
              </Text>
              <Button
                color="black"
                bg={buttonBg}
                _hover={{
                  bg: "purple.300",
                  color: "white",
                }}
                fontSize="2xl"
                onClick={onAddToCartHandler}
              >
                Add to Cart
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
};

export default CardDetails;
