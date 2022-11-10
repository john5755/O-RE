import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageOption, SelectPageType } from "../types";

export interface PageState {
  pageState: Array<PageOption>;
  selectPageState: SelectPageType;
}

const initialState: PageState = {
  pageState: [],
  selectPageState: {
    idx: -1,
    pageId: -1,
  },
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
    delPageState: (state, action: PayloadAction<PageOption>) => {
      state.pageState = state.pageState.filter(
        (prev) => prev !== action.payload
      );
    },
  },
});

export const { addPageState, delPageState, setPageState, setSelectPageState } =
  myPageStateSlice.actions;

export default myPageStateSlice.reducer;
