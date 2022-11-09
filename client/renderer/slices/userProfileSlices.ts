import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileOptions } from "../types";

interface UserProfileState {
  userProfileState: UserProfileOptions;
}

const initialState: UserProfileState = {
  userProfileState: {
    email: "",
    name: "",
    nickname: "",
    role: "USER",
    profileImage: "",
  },
};

export const userProfileStateSlice = createSlice({
  name: "userProfileState",
  initialState,
  reducers: {
    setUserProfileState: (state, action: PayloadAction<UserProfileOptions>) => {
      state.userProfileState = action.payload;
    },
  },
});

export const { setUserProfileState } = userProfileStateSlice.actions;

export default userProfileStateSlice.reducer;
