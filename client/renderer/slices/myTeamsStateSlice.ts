import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamOptions } from "../types";

export interface MyTeamsState {
  myTeamsState: Array<TeamOptions>;
}

const initialState: MyTeamsState = {
  myTeamsState: [
    {
      teamId: 999,
      name: "현재 속한 팀이 없습니다.",
      imageUrl: "images/logo.png",
    },
  ],
};

export const myTeamsStateSlice = createSlice({
  name: "myTeamsState",
  initialState,
  reducers: {
    setTeamState: (state, action: PayloadAction<Array<TeamOptions>>) => {
      state.myTeamsState = action.payload;
    },
    addTeamState: (state, action: PayloadAction<TeamOptions>) => {
      state.myTeamsState = [...state.myTeamsState, action.payload];
    },
    delTeamState: (state, action: PayloadAction<TeamOptions>) => {
      state.myTeamsState = state.myTeamsState.filter(
        (prev) => prev !== action.payload
      );
    },
  },
});

export const { addTeamState, delTeamState, setTeamState } =
  myTeamsStateSlice.actions;

export default myTeamsStateSlice.reducer;
