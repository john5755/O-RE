import { configureStore } from "@reduxjs/toolkit";
import listStateSlice from "./slices/listSlices";
import loginSlice from "./slices/loginSlices";
import myGroupsStateSlice from "./slices/myGroupsState";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    listState: listStateSlice,
    myGroupsState: myGroupsStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
