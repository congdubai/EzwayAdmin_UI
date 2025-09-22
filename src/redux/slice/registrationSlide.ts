import { callFetchRegistration } from "@/config/api";
import { IRegistration } from "@/types/backend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface IState {
    isFetching: boolean;
    paging: {
        pageSize: number;
        pageIndex: number;
        total: number;
        countTotal: boolean;
    } | null;
    result: IRegistration[];
}

export const fetchRegistration = createAsyncThunk(
    'registration/fetchRegistration',
    async (body: any) => {
        const res = await callFetchRegistration(body);
        return res;
    }
);

const initialState: IState = {
    isFetching: true,
    paging: {
        pageSize: 2,
        pageIndex: 1,
        total: 0,
        countTotal: true
    },
    result: [],
};
export const registrationSlide = createSlice({
    name: 'registration',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchRegistration.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRegistration.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.paging = action.payload.paging!;
                state.result = action.payload.data;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },
});

export default registrationSlide.reducer;