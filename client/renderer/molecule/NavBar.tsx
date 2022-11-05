import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "../hooks/reduxHook";

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

const SelectedGroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

export default function NavBar() {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  return (
    <Container>
      <SelectedGroupContainer>그룹1</SelectedGroupContainer>
      <ProfileImgContainer>
        <UserProfileImg src={userProfile.profileImage}></UserProfileImg>
      </ProfileImgContainer>
    </Container>
  );
}
