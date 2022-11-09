import styled from "@emotion/styled";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { BASIC_PHOTO_URL } from "../constants";
import { PATH } from "../constants";
import Router from "next/router";
import { BarProps } from "../types";

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

export default function TeamSideBar(props: BarProps) {
  const selectTeam = (idx: number, teamId: number): void => {
    props.setSelectedTeamId({ idx, teamId });
  };
  const myTeams = useAppSelector((state) => state.myTeamsState).myTeamsState;

  return (
    <Container>
      <TeamContainer>
        {myTeams.map((team, idx) => (
          <div key={idx}>
            {team.imageUrl === BASIC_PHOTO_URL ? (
              <NoProfileContainer
                style={
                  idx === props.selectedTeamId.idx ? clickedCss : unClickedCss
                }
                onClick={() => {
                  selectTeam(idx, team.teamId);
                }}
              >
                {team.name}
              </NoProfileContainer>
            ) : (
              <TeamProfileImg
                src={
                  typeof team.imageUrl === "string"
                    ? team.imageUrl
                    : BASIC_PHOTO_URL
                }
                style={
                  idx === props.selectedTeamId.idx ? clickedCss : unClickedCss
                }
                onClick={() => {
                  selectTeam(idx, team.teamId);
                }}
              ></TeamProfileImg>
            )}
          </div>
        ))}
        <PlusButtonContainer
          onClick={() => {
            Router.push(PATH.CREATE_TEAM);
          }}
        >
          +
        </PlusButtonContainer>
      </TeamContainer>
    </Container>
  );
}
