import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { BASIC_PHOTO_TEAM, SERVER_ROLE, TEAM_USER_API } from "../constants";
import { PATH } from "../constants";
import Router from "next/router";
import { BarProps, TeamOptions } from "../types";
import { setSelectTeamState, setTeamState } from "../slices/myTeamsStateSlice";
import { setIsCreate, setSelectPageState } from "../slices/pageSlice";
import {
  useClickOther,
  useClickTeam,
  useResetPage,
} from "../hooks/resetPageHook";
import { setNavName } from "../slices/navNameSlice";
import axios from "../utils/axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--main-color);
`;

const TeamContainer = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TeamProfileImg = styled.img`
  border-radius: 50%;
  display: block;
  margin: 8px auto;
  cursor: pointer;
`;

const NoProfileContainer = styled.div`
  border-radius: 50%;
  background-color: rgb(239, 239, 239);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px auto;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
`;

const PlusButtonContainer = styled.div`
  border-radius: 50%;
  background-color: transparent;
  border-style: dashed;
  border: 1px dashed white;
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 20px auto;
  padding-bottom: 6px;
  padding-left: 1.5px;
  cursor: pointer;
`;

type HomeImgaeContainerProps = {
  highlighted: boolean;
};
const HomeImageContainer = styled.img<HomeImgaeContainerProps>`
  border-radius: 50%;
  display: block;
  margin: 8px auto;
  cursor: pointer;

  width: ${(props) => (props.highlighted ? "60px" : "50px")};
  height: ${(props) => (props.highlighted ? "60px" : "50px")};
  border: 4px solid #c4e1e3;
`;

const unClickedCss = {
  width: "50px",
  height: "50px",
  fontSize: "12px",
};
const clickedCss = {
  width: "60px",
  height: "60px",
  fontSize: "16px",
  border: "4px solid #C4E1E3",
};

export default function TeamSideBar() {
  const myTeams = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const isCreate = useAppSelector((state) => state.pageState).isCreate;
  const myRole = useAppSelector((state) => state.userProfileState)
    .userProfileState.role;
  const dispatch = useAppDispatch();
  const resetPage = useResetPage();
  const clickTeam = useClickTeam();
  const clickOther = useClickOther();

  const setMyTeams = useCallback(async () => {
    try {
      const params = {
        page: 0,
        size: 20,
      };
      const { data } = await axios.get(TEAM_USER_API.LIST, {
        params,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const myTeams: Array<TeamOptions> = data.data.content;
      dispatch(setTeamState(myTeams));
      if (isCreate) {
        dispatch(
          setSelectTeamState({
            idx: myTeams.length - 1,
            teamId: myTeams[myTeams.length - 1].teamId,
          })
        );
        dispatch(setNavName(myTeams[myTeams.length - 1].name));
        dispatch(setIsCreate(false));
      } else {
        if (teamList.length === 0) {
          dispatch(
            setSelectTeamState({
              idx: -1,
              teamId: -1,
            })
          );
          dispatch(setNavName("Welcome O:RE"));
        } else {
          dispatch(
            setSelectTeamState({
              idx: 0,
              teamId: myTeams[0].teamId,
            })
          );
          dispatch(setNavName(myTeams[0].name));
        }
      }
    } catch {}
  }, [teamList.length]);

  useEffect(() => {
    setMyTeams();
  }, [teamList.length]);
  const path = Router.pathname;
  return (
    <Container>
      <HomeImageContainer
        src="/images/logo.png"
        onClick={() => {
          Router.push("/");
          dispatch(setSelectTeamState({ idx: -1, teamId: -1 }));
          dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
        }}
        highlighted={path === "/"}
      ></HomeImageContainer>
      <TeamContainer>
        {myTeams.length > 0 &&
          myTeams.map((team, idx) => (
            <div key={idx}>
              {team.imageUrl === BASIC_PHOTO_TEAM ? (
                <NoProfileContainer
                  style={idx === selectTeam.idx ? clickedCss : unClickedCss}
                  onClick={() => {
                    Router.push("/view-page");

                    dispatch(setSelectTeamState({ idx, teamId: team.teamId }));
                    dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
                    dispatch(setNavName(team.name));
                    clickTeam();
                  }}
                >
                  {team.name}
                </NoProfileContainer>
              ) : (
                <TeamProfileImg
                  src={
                    typeof team.imageUrl === "string"
                      ? team.imageUrl
                      : BASIC_PHOTO_TEAM
                  }
                  style={idx === selectTeam.idx ? clickedCss : unClickedCss}
                  onClick={() => {
                    dispatch(setSelectTeamState({ idx, teamId: team.teamId }));
                    dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
                    dispatch(setNavName(team.name));
                    clickTeam();
                    Router.push("/view-page");
                  }}
                ></TeamProfileImg>
              )}
            </div>
          ))}
        {SERVER_ROLE.ADMIN.includes(myRole) && (
          <PlusButtonContainer
            onClick={() => {
              Router.push(PATH.CREATE_TEAM);
              resetPage();
              clickOther();
              dispatch(setNavName("팀 생성"));
            }}
          >
            +
          </PlusButtonContainer>
        )}
      </TeamContainer>
    </Container>
  );
}
