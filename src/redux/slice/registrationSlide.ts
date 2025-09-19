import { callFetchRegistration } from "@/config/api";
import { IRegistration } from "@/types/backend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IRegistration[];

}

export const fetchRegistration = createAsyncThunk(
    'registration/fetchRegistration',
    async ({ query }: { query: string }) => {
        const res = await callFetchRegistration(query);
        return res;
    }
)

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 1,
        pageSize: 5,
        pages: 0,
        total: 0
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
                state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },
});

export default registrationSlide.reducer;