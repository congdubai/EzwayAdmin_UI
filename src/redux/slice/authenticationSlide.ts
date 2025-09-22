import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchAuthentication } from "@/config/api";
import { IAuthentication } from "@/types/backend";

interface IState {
    isFetching: boolean;
    paging: {
        pageSize: number;
        pageIndex: number;
        total: number; 
        countTotal: boolean;
    } | null;
    result: IAuthentication[];
}

export const fetchAuthentication = createAsyncThunk(
  "authentication/fetchAuthentication",
  async (body: any) => {
    const res = await callFetchAuthentication(body);
    return res;
  } 
);

const initialState: IState = {
    isFetching: true,
    paging: {
        pageSize: 10,
        pageIndex: 1,
        total: 0,
        countTotal: true
    },
    result: [],
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthentication.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAuthentication.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(fetchAuthentication.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.paging = action.payload.paging!;
        state.result = action.payload.data as IAuthentication[];
      }
    });
  },
});

export default authenticationSlice.reducer;
