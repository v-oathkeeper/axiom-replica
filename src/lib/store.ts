
import { configureStore } from '@reduxjs/toolkit';

// A simple counter reducer
const placeholderReducer = (state = { count: 0 }, action: any) => {
  return state;
};

export const store = configureStore({
  reducer: {
    // Placeholder
    app: placeholderReducer, 
  },
  // Middleware is included by default with Redux Toolkit
  devTools: process.env.NODE_ENV !== 'production',
});

// Define RootState and AppDispatch types for strict typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;