import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectTeamType, TeamOptions } from "../types";
import { PURGE } from "redux-persist";

export interface MyTeamsState {
  myTeamsState: Array<TeamOptions>;
  selectTeamState: SelectTeamType;
}

const initialState: MyTeamsState = {
  myTeamsState: [],
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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { addTeamState, delTeamState, setTeamState, setSelectTeamState } =
  myTeamsStateSlice.actions;

export default myTeamsStateSlice.reducer;
