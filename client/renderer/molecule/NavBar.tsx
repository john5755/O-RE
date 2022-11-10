import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import Router from "next/router";
import { useResetPage } from "../hooks/resetPageHook";
import { setNavName } from "../slices/navNameSlice";

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
  color: var(--dark-gray-color);
  font-weight: 600;
  font-size: 19px;
  margin-left: 15px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default function NavBar() {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const resetPage = useResetPage();
  const title = useAppSelector((state) => state.navName).navName;
  const dispatch = useAppDispatch();
  return (
    <Container>
      <SelectedTeamContainer>{title}</SelectedTeamContainer>
      <ProfileImgContainer>
        <UserProfileImg
          src={userProfile.profileImage}
          onClick={() => {
            Router.push("/account-options");
            resetPage();
            dispatch(setNavName("O:RE 설정"));
          }}
        ></UserProfileImg>
      </ProfileImgContainer>
    </Container>
  );
}
