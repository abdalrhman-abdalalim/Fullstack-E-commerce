import { Button, Divider, Flex, Image, Stack ,Text } from "@chakra-ui/react"
import { IProduct } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import {  RemoveItemCart } from "../app/features/cart/cartSlice";

const CartDrawerItem = (product:IProduct)=>{
    const CartItems = useSelector((state:RootState)=>state.cart.cartProducts);
    const dispatch = useAppDispatch();
    const onRemoveItem = () => {
        const NewCart = CartItems.filter(item=>item.id!=product.id);
        dispatch(RemoveItemCart(product.id));
        console.log(NewCart);
    }
  return (
    <>
      <Flex
        alignItems={"center"}
        h={"90px"}
        p={"5px"}
      >
        <Image
          src={`${product.thumbnail.url}`}
          w={"58px"}
          h={"58px"}
          rounded={"full"}
          alt={product.title}
        />
        <Stack ml={'30px'}>
          <Flex alignItems={'center'}>
            <Text fontSize={'12px'} mr={'10px'}>{product.title}</Text>
            <Text fontSize={'13px'}>${product.price}</Text>
          </Flex>
          <Text fontSize={'13px'}>Quantity : {product.quantity}</Text>
          <Button onClick={onRemoveItem} variant={'solid'} colorScheme="red" w={'65px'} h={'25px'} fontSize={'15px'}>Remove</Button>
        </Stack>
      </Flex>
      <Divider/>
    </>
  );
}
export default CartDrawerItem