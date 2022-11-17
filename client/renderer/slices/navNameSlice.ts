import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface NavNameType {
  navName: string;
  isTeam: boolean;
  isPage: boolean;
}

const initialState: NavNameType = {
  navName: "",
  isTeam: true,
  isPage: false,
};

export const navNameSlice = createSlice({
  name: "navName",
  initialState,
  reducers: {
    setNavName: (state, action: PayloadAction<string>) => {
      state.navName = action.payload;
    },
    setIsTeam: (state, action: PayloadAction<boolean>) => {
      state.isTeam = action.payload;
    },
    setIsPage: (state, action: PayloadAction<boolean>) => {
      state.isPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setNavName, setIsPage, setIsTeam } = navNameSlice.actions;

export default navNameSlice.reducer;
