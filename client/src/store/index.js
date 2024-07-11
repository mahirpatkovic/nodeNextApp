import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './auth';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: () =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
