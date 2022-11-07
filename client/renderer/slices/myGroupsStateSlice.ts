import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupOptions } from "../types";

export interface MyGroupsState {
  myGroupsState: Array<GroupOptions>;
}

const initialState: MyGroupsState = {
  myGroupsState: [
    {
      teamId: 999,
      name: "현재 속한 팀이 없습니다.",
      imageUrl: "images/logo.png",
    },
  ],
};

export const myGroupsStateSlice = createSlice({
  name: "myGroupsState",
  initialState,
  reducers: {
    setGroupState: (state, action: PayloadAction<Array<GroupOptions>>) => {
      state.myGroupsState = action.payload;
    },
    addGroupState: (state, action: PayloadAction<GroupOptions>) => {
      state.myGroupsState = [...state.myGroupsState, action.payload];
    },
    delGroupState: (state, action: PayloadAction<GroupOptions>) => {
      state.myGroupsState = state.myGroupsState.filter(
        (prev) => prev !== action.payload
      );
    },
  },
});

export const { addGroupState, delGroupState, setGroupState } =
  myGroupsStateSlice.actions;

export default myGroupsStateSlice.reducer;
