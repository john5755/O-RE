import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AxiosState {
  axiosState: string;
}

const initialState: AxiosState = {
  axiosState: "",
};

export const axiosSlice = createSlice({
  name: "axiosState",
  initialState,
  reducers: {
    setAxiosState: (state, action: PayloadAction<string>) => {
      state.axiosState = action.payload;
    },
  },
});

export const { setAxiosState } = axiosSlice.actions;

export default axiosSlice.reducer;
