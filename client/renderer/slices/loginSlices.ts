import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean;
  name: String;
}

const initialState: LoginState = {
  isLogin: true,
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
});

export const { setLogIn, setLogOut } = loginSlice.actions;

export default loginSlice.reducer;
