import type { Action, ThunkAction, } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlide';
import registrationReducer from './slice/registrationSlide';
import authenticationReducer from './slice/authenticationSlide';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        registration: registrationReducer,
        authentication : authenticationReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;