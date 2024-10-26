import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INetwork {
  isOnline: boolean; 
}

const initialState: INetwork = {
  isOnline:true,
};


const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action: PayloadAction<boolean>) => {
        state.isOnline=action.payload;
  },
}})

export const { networkMode } = networkSlice.actions;
export default networkSlice.reducer;
