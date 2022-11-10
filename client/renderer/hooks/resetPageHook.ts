import { setSelectTeamState } from "../slices/myTeamsStateSlice";
import { setSelectPageState } from "../slices/pageSlice";
import { useAppDispatch } from "./reduxHook";

export const useResetPage = () => {
  const dispatch = useAppDispatch();

  const restPage = () => {
    dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
    dispatch(setSelectTeamState({ idx: -1, teamId: -1 }));
  };
  return restPage;
};
