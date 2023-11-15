import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
