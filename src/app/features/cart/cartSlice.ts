import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../interfaces";
import { isProductExist } from "../../../utils/functions";
import { createStandaloneToast } from "@chakra-ui/react";

interface ICart {
  cartProducts: IProduct[]; // IProduct array
}

const initialState: ICart = {
  cartProducts: [],
};

// Create the toast instance using createStandaloneToast
const { toast } = createStandaloneToast(); // Extract the toast function

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const tempLen = state.cartProducts.length;
      state.cartProducts = isProductExist(action.payload, state.cartProducts);

      if (state.cartProducts.length === tempLen) {
        toast({
          title: "Item already in the cart",
          description: "The quantity has been increased.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Item added to cart",
          description: "Successfully added to your cart.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    RemoveItemCart:(state,action:PayloadAction<number>) =>{
        state.cartProducts = state.cartProducts.filter(item=>item.id!=action.payload);
    },
    RemoveAllItmes:(state)=>{
        state.cartProducts=[];
    }
  },
});

export const { addToCart, RemoveItemCart, RemoveAllItmes } = cartSlice.actions;
export default cartSlice.reducer;
