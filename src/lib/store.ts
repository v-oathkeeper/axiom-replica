import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;