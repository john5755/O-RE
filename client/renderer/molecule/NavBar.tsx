import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import Router from "next/router";
import { useClickOther, useResetPage } from "../hooks/resetPageHook";
import { setNavName } from "../slices/navNameSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import { PATH, TEAM_ROLE } from "../constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  background-color: var(--light-main-color);
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-gray-color);
  font-weight: 600;
  font-size: 19px;
  margin: 0 15px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 5px;
  cursor: pointer;
`;

export default function NavBar() {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const resetPage = useResetPage();
  const navInfo = useAppSelector((state) => state.navName);
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const dispatch = useAppDispatch();
  const clickOther = useClickOther();
  return (
    <Container>
      <LeftContainer>
        <TitleContainer>{navInfo.navName}</TitleContainer>
        {navInfo.isTeam &&
          teamIdx !== -1 &&
          teamIdx < teamList.length &&
          teamList[teamIdx].teamUserRole !== undefined &&
          TEAM_ROLE.MANAGER.includes(teamList[teamIdx].teamUserRole) && (
            <SettingsIcon
              fontSize="small"
              onClick={() => {
                dispatch(setNavName(`${navInfo.navName}팀 관리`));
                Router.push(PATH.MANAGE_TEAM);
                clickOther();
              }}
              sx={{ cursor: "pointer" }}
            ></SettingsIcon>
          )}
      </LeftContainer>
      <RightContainer>
        <UserProfileImg
          src={userProfile.profileImage}
          onClick={() => {
            Router.push(PATH.ACCOUNT_OPTIONS);
            resetPage();
            clickOther();
            dispatch(setNavName("O:RE 설정"));
          }}
        ></UserProfileImg>
      </RightContainer>
    </Container>
  );
}
