import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectTeamType, TeamOptions } from "../types";
import { PURGE } from "redux-persist";

export interface MyTeamsState {
  myTeamsState: Array<TeamOptions>;
  selectTeamState: SelectTeamType;
}

const initialState: MyTeamsState = {
  myTeamsState: [
    {
      teamId: 0,
      name: "",
      imageUrl: "",
      teamUserRole: "",
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
        (prev) => prev.teamId !== action.payload.teamId
      );
    },
    editTeamState: (
      state,
      action: PayloadAction<{ name: string; imageUrl: string }>
    ) => {
      state.myTeamsState[state.selectTeamState.idx].name = action.payload.name;
      state.myTeamsState[state.selectTeamState.idx].imageUrl =
        action.payload.imageUrl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  addTeamState,
  delTeamState,
  setTeamState,
  editTeamState,
  setSelectTeamState,
} = myTeamsStateSlice.actions;

export default myTeamsStateSlice.reducer;
