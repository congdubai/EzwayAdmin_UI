import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callVerifyToken, logoutAPI } from "@/config/api";

const persistedAccount = JSON.parse(localStorage.getItem("account") || "null");
const persistedAuth = localStorage.getItem("isAuthenticated") === "true";

export const fetchAccount = createAsyncThunk(
    "account/fetchAccount",
    async () => {
        const response = await callVerifyToken();
        return response.data; // { userId, fullName, role }
    }
);

interface IAccount {
    userId: string;
    fullName: string;
    role: string;
}

interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    account: IAccount;
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: persistedAuth || false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    account: persistedAccount || { userId: "", fullName: "", role: "" },
    activeMenu: "home",
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setActiveMenu: (state, action: PayloadAction<string>) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action: PayloadAction<IAccount>) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.account = { ...action.payload };

            localStorage.setItem("account", JSON.stringify(state.account));
            localStorage.setItem("isAuthenticated", "true");
        },
        setLogoutAction: (state) => {
            localStorage.removeItem("account");
            localStorage.removeItem("isAuthenticated");
            state.isAuthenticated = false;
            state.account = { userId: "", fullName: "", role: "" };
        },
        setRefreshTokenAction: (state, action: PayloadAction<{ status?: boolean; message?: string }>) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.account = {
                userId: action.payload.data.userId,
                fullName: action.payload.data.fullName,
                role: action.payload.data.role,
            };
            localStorage.setItem("account", JSON.stringify(state.account));
            localStorage.setItem("isAuthenticated", "true");
        });

        builder.addCase(fetchAccount.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem("account");
            localStorage.removeItem("isAuthenticated");
        });
    },
});

export const { setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction } = accountSlice.actions;

export const logoutAsync = () => async (dispatch: any) => {
    try {
        await logoutAPI();
    } finally {
        dispatch(setLogoutAction());
    }
};

export default accountSlice.reducer;
