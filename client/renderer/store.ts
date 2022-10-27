import { configureStore } from "@reduxjs/toolkit";
import listStateSlice from "./slices/listSlices";
import loginSlice from "./slices/loginSlices";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    listState: listStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
