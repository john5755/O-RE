import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import {
  BASIC_PHOTO_TEAM,
  PATH,
  TEAM_API,
  TEAM_USER_API,
  USERS_API,
} from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import axios from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { delTeamState, editTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";
import { useClickTeam } from "../hooks/resetPageHook";

const TeamProfileContainer = styled.div`
  width: 100%;
`;

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

export default function TeamProfile() {
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const teamRole = useMemo(() => {
    return teamList[teamIdx].teamUserRole;
  }, [teamIdx]);
  const dispatch = useAppDispatch();
  const clickTeam = useClickTeam();
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    teamList[teamIdx]?.imageUrl
  );
  // nickname 변경
  const [teamName, setTeamName] = useState<string>(teamList[teamIdx]?.name);
  function handleTeamNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }

  // 변경사항 저장
  const submitModifyTeam = async () => {
    const imageUrl =
      photoUrl === BASIC_PHOTO_TEAM ? "" : teamList[teamIdx].imageUrl;
    const infoJson = { teamId: teamId, name: teamName, imageUrl: imageUrl };
    const info = JSON.stringify(infoJson);
    const formData = new FormData();
    if (photo !== null) {
      formData.append("image", photo);
    }
    formData.append("info", new Blob([info], { type: "application/json" }));
    try {
      const { data } = await axios.post(TEAM_API.MODIFY, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const action = { name: data.data.name, imageUrl: data.data.imageUrl };
      dispatch(editTeamState(action));
    } catch (error) {}
  };

  // 팀 삭제
  const deleteTeam = async () => {
    try {
      await axios.delete(`${TEAM_API.DELETE}/${teamId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      dispatch(delTeamState(teamList[teamIdx]));
      clickTeam();
    } catch (e) {}
  };

  return (
    <TeamProfileContainer>
      <ProfilePhotos
        photo={photo}
        setPhoto={setPhoto}
        photoUrl={photoUrl}
        setPhotoUrl={setPhotoUrl}
        teamName={teamName}
      ></ProfilePhotos>
      <NameContainer>
        <Label htmlFor="teamNameInput">팀 이름</Label>
        <Input
          id="teamNameInput"
          name="teamname"
          height="50px"
          onChange={handleTeamNameInput}
          style={{ margin: "10px auto" }}
          value={teamName}
        ></Input>
      </NameContainer>
      <ButtonContainer>
        {(teamRole === "LEADER" || teamRole === "OWNER") && (
          <Button
            height="50px"
            style={{
              background: "white",
              color: "#C74E4E",
              border: "2px solid #C74E4E",
            }}
            onClick={deleteTeam}
          >
            팀 삭제
          </Button>
        )}
      </ButtonContainer>
      <ButtonContainer>
        <Button height="50px" onClick={submitModifyTeam}>
          저장
        </Button>
      </ButtonContainer>
    </TeamProfileContainer>
  );
}
