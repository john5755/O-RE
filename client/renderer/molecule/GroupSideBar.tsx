import styled from "@emotion/styled";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { BASIC_PHOTO_URL } from "../constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--main-color);
`;

const GroupProfileImg = styled.img`
  border-radius: 50%;
  display: block;
  margin: 8px auto;
  cursor: pointer;
`;

const NoProfileContainer = styled.div`
  border-radius: 50%;
  background-color: var(--light-main-color);
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px auto;
  cursor: pointer;
`;

const unClickedCss = {
  width: "50px",
  height: "50px",
  fontSize: "12px",
};
const clickedCss = {
  width: "68px",
  height: "68px",
  fontSize: "16px",
};

export default function GroupSideBar() {
  const [clickedIdx, setClickedIdx] = useState<number>(0);
  const selectGroup = (num: number): void => {
    setClickedIdx(num);
  };
  const myGroups = useAppSelector((state) => state.myGroupsState).myGroupsState;

  return (
    <Container>
      {myGroups.map((group, idx) => (
        <>
          {group.profileUrl === BASIC_PHOTO_URL ? (
            <NoProfileContainer
              style={idx === clickedIdx ? clickedCss : unClickedCss}
              onClick={() => {
                selectGroup(idx);
              }}
            >
              {group.name}
            </NoProfileContainer>
          ) : (
            <GroupProfileImg
              src={
                typeof group.profileUrl === "string"
                  ? group.profileUrl
                  : BASIC_PHOTO_URL
              }
              style={idx === clickedIdx ? clickedCss : unClickedCss}
              onClick={() => {
                selectGroup(idx);
              }}
            ></GroupProfileImg>
          )}
        </>
      ))}
    </Container>
  );
}
