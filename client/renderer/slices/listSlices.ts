import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface ListState {
  listState: boolean;
}

const initialState: ListState = {
  listState: true,
};

export const listStateSlice = createSlice({
  name: "listState",
  initialState,
  reducers: {
    setListStateTrue: (state) => {
      state.listState = true;
    },
    setListStateFalse: (state) => {
      state.listState = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setListStateTrue, setListStateFalse } = listStateSlice.actions;

export default listStateSlice.reducer;
