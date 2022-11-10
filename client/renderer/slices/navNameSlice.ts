import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface NavNameType {
  navName: string;
}

const initialState: NavNameType = {
  navName: "",
};

export const navNameSlice = createSlice({
  name: "navName",
  initialState,
  reducers: {
    setNavName: (state, action: PayloadAction<string>) => {
      state.navName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setNavName } = navNameSlice.actions;

export default navNameSlice.reducer;
