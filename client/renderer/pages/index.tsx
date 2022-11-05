import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { setGroupState } from "../slices/myGroupsStateSlice";
import { setUserProfileState } from "../slices/userProfileSlices";
import axios from "../utils/axios";
import { TEAM_USER_API, USERS_API } from "../constants";
import { GroupOptions } from "../types";

export default function Home() {
  const dispatch = useAppDispatch();

  const setMyTeams = useCallback(async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const params = {
        page: 1,
        size: 20,
      };
      const { data } = await axios.get(TEAM_USER_API.LIST, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const myTeams: Array<GroupOptions> = data.data.content;
      dispatch(setGroupState(myTeams));
    } catch {}
  }, []);

  const setUserProfile = useCallback(async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const { data } = await axios.get(USERS_API.MYPAGE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setUserProfileState(data.data));
    } catch {}
  }, []);

  useEffect(() => {
    setMyTeams();
    setUserProfile();
  }, []);

  return <div>home</div>;
}
