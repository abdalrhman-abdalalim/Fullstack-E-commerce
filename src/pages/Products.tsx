import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react"
import CardComponent from "../components/CardComponent"
import axios from "axios";
import { useQuery } from "react-query";
import { IProduct } from "../interfaces";

interface IProps{

}
const Products = ({}:IProps)=>{
    const getProductList= async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}`, {
        params: {
          populate: "thumbnail",
          fields: "title,price,description",
        },
      });
      console.log(data);
      return data
    }
    const {isLoading,data}=useQuery("products",()=>getProductList());
    if(isLoading  )return (
      <Grid margin={20} templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}>
        {Array.from({ length: 20 }, (_,index) => (
          <Box height={"300px"} bg={"gray.700"} p={5} rounded={""} key={index}>
            <Skeleton boxSize={"150px"} mx={'auto'} rounded={"50%"}/>
            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing={"4"}
              mx={"auto"}
              maxW={"250px"}
            />
            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing={"4"}
            />
            <SkeletonText mt="4" noOfLines={1} spacing={"4"} mx={'auto'} maxW={'250px'}/>
            <Skeleton width={"200px"} height={"30px"} rounded={"10px"} mt={'10px'} mx={'auto'}/>
          </Box>
        ))}
      </Grid>
    );
  return (
    <>
      <Grid margin={20} templateColumns={"repeat(auto-fill,minmax(250px,1fr))"}>
        {data?.data.map((product: IProduct) => (
          <CardComponent
            key={product.id}
            description={product.description}
            id={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            documentId={product.documentId}
            quantity={product.quantity}
          />
        ))}
      </Grid>
    </>
  );
}
export default Products