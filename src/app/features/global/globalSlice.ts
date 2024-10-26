import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IGlobal {
    isOpenDrawer:boolean,
}

const initialState: IGlobal = {
  isOpenDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenDrawerAction: (state, action: PayloadAction<boolean>) => {
      state.isOpenDrawer = action.payload// Assuming payload is a boolean
    },
    onCloseDrawerAction: (state, action: PayloadAction<boolean>) => {
      state.isOpenDrawer = action.payload; // Assuming payload is a boolean
    },
  },
});
export const { onOpenDrawerAction, onCloseDrawerAction} = globalSlice.actions;
export default globalSlice.reducer;
