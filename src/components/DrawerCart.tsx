import {
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { onCloseDrawerAction } from "../app/features/global/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { RemoveAllItmes } from "../app/features/cart/cartSlice";
import { IProduct } from "../interfaces";



interface IProps{

}
const DrawerCart = ({}:IProps)=>{
    const isDrawerOpen = useSelector((state:RootState)=>state.global.isOpenDrawer)
    const CartItems = useSelector(
      (state: RootState) => state.cart.cartProducts
    );
    const dispatch = useAppDispatch();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const onCloseDrawer = () => {
        dispatch(onCloseDrawerAction(false));
    }
    const onRemoveAllItems =()=>{
        dispatch(RemoveAllItmes());
    }
  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onCloseDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart Itmes</DrawerHeader>

          <DrawerBody>
            {CartItems.length ? (
              CartItems.map((product:IProduct) => (
                <CartDrawerItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  thumbnail={product.thumbnail}
                  documentId={product.documentId}
                  quantity={product.quantity}
                />
              ))
            ) : (
              <Text fontWeight={"bold"} m={"10px"}>
                No Items in your cart
              </Text>
            )}
          </DrawerBody>
          {CartItems.length ? (
          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={onRemoveAllItems}
            >
              clear All
            </Button>
          </DrawerFooter>     
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerCart