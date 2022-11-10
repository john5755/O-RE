import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface LoginState {
  isLogin: boolean;
  name: String;
}

const initialState: LoginState = {
  isLogin: false,
  name: "홍길동",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogIn: (state, action: PayloadAction<String>) => {
      state.isLogin = true;
      state.name = action.payload;
    },
    setLogOut: (state) => {
      state.isLogin = false;
      state.name = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setLogIn, setLogOut } = loginSlice.actions;

export default loginSlice.reducer;
