import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectTeamType, TeamOptions } from "../types";

export interface MyTeamsState {
  myTeamsState: Array<TeamOptions>;
  selectTeamState: SelectTeamType;
}

const initialState: MyTeamsState = {
  myTeamsState: [
    {
      teamId: 999,
      name: "현재 속한 팀이 없습니다.",
      imageUrl: "images/logo.png",
    },
  ],
  selectTeamState: {
    idx: -1,
    teamId: -1,
  },
};

export const myTeamsStateSlice = createSlice({
  name: "myTeamsState",
  initialState,
  reducers: {
    setTeamState: (state, action: PayloadAction<Array<TeamOptions>>) => {
      state.myTeamsState = action.payload;
    },
    setSelectTeamState: (state, action: PayloadAction<SelectTeamType>) => {
      state.selectTeamState = action.payload;
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

export const { addTeamState, delTeamState, setTeamState, setSelectTeamState } =
  myTeamsStateSlice.actions;

export default myTeamsStateSlice.reducer;
