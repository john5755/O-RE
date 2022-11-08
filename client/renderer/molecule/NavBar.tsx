import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { BarProps } from "../types";
import Router from "next/router";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  background-color: var(--light-main-color);
`;

const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const SelectedTeamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default function NavBar(props: BarProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;

  const myTeams = useAppSelector((state) => state.myTeamsState).myTeamsState;

  return (
    <Container>
      <SelectedTeamContainer>
        {props.selectedTeamId == -1 ? "" : myTeams[props.selectedTeamId].name}
      </SelectedTeamContainer>
      <ProfileImgContainer>
        <UserProfileImg
          src={userProfile.profileImage}
          onClick={() => {
            Router.push("/account-options");
          }}
        ></UserProfileImg>
      </ProfileImgContainer>
    </Container>
  );
}
