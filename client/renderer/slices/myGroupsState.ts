import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupOptions extends Object {
  name: string;
  profileUrl: string | null | ArrayBuffer;
}

export interface MyGroupsState {
  myGroupsState: Array<GroupOptions>;
}

const initialState: MyGroupsState = {
  myGroupsState: [
    { name: "그룹1", profileUrl: "images/logo.png" },
    {
      name: "그룹2",
      profileUrl:
        "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png",
    },
    {
      name: "그룹3",
      profileUrl: "images/sendmail.png",
    },
  ],
};

export const myGroupsStateSlice = createSlice({
  name: "myGroupsState",
  initialState,
  reducers: {
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

export const { addGroupState, delGroupState } = myGroupsStateSlice.actions;

export default myGroupsStateSlice.reducer;
