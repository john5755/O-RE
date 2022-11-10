import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileOptions } from "../types";
import { PURGE } from "redux-persist";

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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUserProfileState } = userProfileStateSlice.actions;

export default userProfileStateSlice.reducer;
