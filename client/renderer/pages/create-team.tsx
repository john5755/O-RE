import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, Input, Button, Label } from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addTeamState, setSelectTeamState } from "../slices/myTeamsStateSlice";
import { BASIC_PHOTO_TEAM, TEAM_API } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import axios from "../utils/axios";
import { setIsCreate } from "../slices/pageSlice";
import { useClickTeam } from "../hooks/resetPageHook";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 560px) {
    width: 80%;
  }
  min-width: 480px;
  max-width: 560px;
`;

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

export default function CreateTeam() {
  const dispatch = useAppDispatch();
  const myTeams = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    BASIC_PHOTO_TEAM
  );

  const [teamName, setTeamName] = useState<string>("");
  function handleTeamNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }
  const clickTeam = useClickTeam();

  const submitCreateTeam = async () => {
    const teamInfoJson = {
      name: teamName,
      imageUrl: photoUrl,
    };
    const teamInfo = JSON.stringify(teamInfoJson);
    const formData = new FormData();
    if (photo !== null) {
      formData.append("image", photo);
    }
    formData.append("info", new Blob([teamInfo], { type: "application/json" }));
    try {
      const { data } = await axios.post(TEAM_API.CREATE, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      dispatch(
        addTeamState({
          teamId: myTeams.length,
          name: teamName,
          imageUrl: photoUrl,
          teamUserRole: "",
        })
      );
      dispatch(setSelectTeamState({ idx: myTeams.length, teamId: data.data }));
      dispatch(setIsCreate(true));
      clickTeam();
    } catch (e) {}
  };

  return (
    <LayoutContainer>
      <Container>
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
            name="teamName"
            style={{ margin: "10px auto" }}
            height="50px"
            onChange={handleTeamNameInput}
          ></Input>
          <ButtonContainer>
            <Button height="50px" onClick={submitCreateTeam}>
              저장
            </Button>
          </ButtonContainer>
        </NameContainer>
      </Container>
    </LayoutContainer>
  );
}
