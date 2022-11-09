import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Button, Label, Input } from "../styles";
import ProfilePhotos from "./ProfilePhotos";
import { useAppSelector } from "../hooks/reduxHook";

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 20px 0;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

const roles = {
  OWNER: "오너",
  LEADER: "리더",
  ADMIN: "관리자",
  USER: "사용자",
};

export default function UserOption() {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    userProfile.profileImage
  );
  // nickname 변경
  const [nickname, setNickName] = useState<string>(userProfile.nickname);

  function handleNicknameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNickName(event.target.value);
  }
  return (
    <>
      <TextContainer>
        <H2 style={{ fontWeight: "bold" }}>계정 설정</H2>
      </TextContainer>
      <ProfilePhotos
        photo={photo}
        setPhoto={setPhoto}
        photoUrl={photoUrl}
        setPhotoUrl={setPhotoUrl}
      ></ProfilePhotos>
      <InfoContainer>
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input
          id="nicknameInput"
          name="nickname"
          height="50px"
          value={nickname}
          onChange={handleNicknameInput}
          style={{ margin: "10px auto" }}
        ></Input>
        <Label>직책</Label>
        <H3 style={{ margin: "5px auto" }}>{roles[userProfile.role]}</H3>
        <Label style={{ display: "block" }}>비밀번호 변경</Label>
        <Button
          width="120px"
          height="35px"
          style={{ background: "#C74E4E", margin: "3px 0 3px" }}
        >
          비밀번호 변경
        </Button>
      </InfoContainer>
      <ButtonContainer>
        <Button
          height="50px"
          style={{
            background: "white",
            color: "#C74E4E",
            border: "2px solid #C74E4E",
          }}
        >
          로그아웃
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button height="50px">저장</Button>
      </ButtonContainer>
    </>
  );
}
