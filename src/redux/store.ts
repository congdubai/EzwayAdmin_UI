import type { Action, ThunkAction, } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlide';
import registrationReducer from './slice/registrationSlide';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        registration: registrationReducer
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