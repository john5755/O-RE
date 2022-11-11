import { setSelectTeamState } from "../slices/myTeamsStateSlice";
import { setIsPage, setIsTeam } from "../slices/navNameSlice";
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

export const useClickPage = () => {
  const dispatch = useAppDispatch();

  const clickPage = () => {
    dispatch(setIsPage(true));
    dispatch(setIsTeam(false));
  };
  return clickPage;
};

export const useClickTeam = () => {
  const dispatch = useAppDispatch();

  const clickTeam = () => {
    dispatch(setIsTeam(true));
    dispatch(setIsPage(false));
  };
  return clickTeam;
};

export const useClickOther = () => {
  const dispatch = useAppDispatch();

  const clickOther = () => {
    dispatch(setIsTeam(false));
    dispatch(setIsPage(false));
  };
  return clickOther;
};
