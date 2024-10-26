import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api.config";
import { IUser } from "../../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";
import CookiesService from "../../services/CookiesService";

interface IState {
    loading : boolean,
    data : string | null,
    error : string | null,
}

const initialState:IState = {
    loading:false,
    data : null,
    error : null
}

const {toast} = createStandaloneToast();

export const userLogin = createAsyncThunk<any, IUser, { rejectValue: string }>(
  "/login/userlogin",
  async (user: IUser, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axiosInstance.post("auth/local", user);
      console.log("from data ", data);
      return data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
    initialState,
    name:"login",
    reducers:{},
    extraReducers:(bilder)=>{
        bilder
        .addCase(userLogin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            const date = new Date();
            state.data=action.payload;
            const IN_DAYS = 3;
            const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
            date.setTime(date.getTime()+EXPIRES_IN_DAYS);
            const options = {path:'/',expires:date};
            CookiesService.set('jwt',action.payload.jwt,options);
            toast({
              title: "Login successfully",
              status: "success",
              isClosable: true,
            });
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.error=action.payload as string;
            state.loading= false;
            const errorMessage = action.payload || "Login failed"; // Fallback in case payload is null
            toast({
            title: errorMessage,
            status: "error",
            isClosable: true,
            });
        })
    }
})

export default loginSlice.reducer;