import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupOptions } from "../types";

export interface MyGroupsState {
  myGroupsState: Array<GroupOptions>;
}

const initialState: MyGroupsState = {
  myGroupsState: [
    { teamId: 0, name: "그룹1", profileUrl: "images/logo.png" },
    {
      teamId: 1,
      name: "그룹2",
      profileUrl:
        "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png",
    },
    { teamId: 2, name: "그룹3", profileUrl: "images/sendmail.png" },
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
