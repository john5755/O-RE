import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, Input, Button, Label } from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addTeamState } from "../slices/myTeamsStateSlice";
import { BASIC_PHOTO_URL, TEAM_API } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import axios from "axios";

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

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 20px 0;
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
  const HOST = useAppSelector((state) => state.axiosState).axiosState;
  const dispatch = useAppDispatch();
  const myTeams = useAppSelector((state) => state.myTeamsState).myTeamsState;
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    BASIC_PHOTO_URL
  );

  // teamName 변경
  const [teamName, setTeamName] = useState<string>("");
  function handleTeamNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }

  const submitCreateTeam = async () => {
    const accessToken = localStorage.getItem("accessToken");
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
      const res = await axios.post(`${HOST}${TEAM_API.CREATE}`, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: accessToken,
        },
      });
      dispatch(
        addTeamState({
          teamId: myTeams.length,
          name: teamName,
          imageUrl: photoUrl,
        })
      );
    } catch {}
  };

  return (
    <LayoutContainer>
      <Container>
        <TextContainer>
          <H2 style={{ fontWeight: "bold" }}>그룹 생성</H2>
        </TextContainer>
        <ProfilePhotos
          photo={photo}
          setPhoto={setPhoto}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
        ></ProfilePhotos>
        <NameContainer>
          <Label htmlFor="teamNameInput">그룹명</Label>
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
