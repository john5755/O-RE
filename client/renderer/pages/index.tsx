import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setGroupState } from "../slices/myGroupsStateSlice";
import { setUserProfileState } from "../slices/userProfileSlices";
import axios from "../utils/axios";
import { TEAM_USER_API, USERS_API, PATH } from "../constants";
import { GroupOptions } from "../types";
import Router from "next/router";

export default function Home() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state)=> state.login).isLogin

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
    if (isLogin === true){
      setMyTeams();
      setUserProfile();
    } else{
      Router.push(PATH.LOGIN)
    }
  }, [isLogin]);

  return <div>home</div>;
}
