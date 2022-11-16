import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageOption, SelectPageType } from "../types";
import { PURGE } from "redux-persist";

export interface PageState {
  pageState: Array<PageOption>;
  selectPageState: SelectPageType;
  isCreate: boolean;
}

const initialState: PageState = {
  pageState: [],
  selectPageState: {
    idx: -1,
    pageId: -1,
  },
  isCreate: false,
};

export const myPageStateSlice = createSlice({
  name: "pageState",
  initialState,
  reducers: {
    setPageState: (state, action: PayloadAction<PageOption[]>) => {
      state.pageState = action.payload;
    },
    setSelectPageState: (state, action: PayloadAction<SelectPageType>) => {
      state.selectPageState = action.payload;
    },
    addPageState: (state, action: PayloadAction<PageOption>) => {
      state.pageState = [...state.pageState, action.payload];
    },
    delPageState: (state, action: PayloadAction<number>) => {
      state.pageState = state.pageState.filter(
        (prev) => prev.pageId !== action.payload
      );
    },
    setIsCreate: (state, action: PayloadAction<boolean>) => {
      state.isCreate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  addPageState,
  delPageState,
  setPageState,
  setSelectPageState,
  setIsCreate,
} = myPageStateSlice.actions;

export default myPageStateSlice.reducer;
