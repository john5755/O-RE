import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, H4, Button, Input, Label } from "../styles";

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
  margin: 10px 0 30px 0;
`;

const PhotoContainer = styled.div`
  width: 100%;
  margin: 10px 0 30px 0;
`;

const ProfilePhoto = styled.img`
  border-radius: 10%;
  width: 35%;
  max-width: 150px;
`;

const ExtraContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

export default function AccountOptions() {
  // profile 사진
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    "images/logo.png"
  );
  const photoInput = useRef<HTMLInputElement>(null);
  const photoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setPhoto(event.target.files[0]);
    } else {
      // 업로드 취소시
      setPhotoUrl("images/logo.png");
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  // nickname 변경
  const [nickname, setNickName] = useState<string>("");

  function handleNicknameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNickName(event.target.value);
  }

  return (
    <LayoutContainer>
      <Container>
        <TextContainer>
          <H2 style={{ fontWeight: "bold" }}>계정 설정</H2>
        </TextContainer>
        <PhotoContainer>
          <Label>프로필 이미지</Label>
          <div>
            <ProfilePhoto
              src={typeof photoUrl === "string" ? photoUrl : "images/logo.png"}
            ></ProfilePhoto>
            <Button
              width="110px"
              height="35px"
              onClick={() => {
                if (photoInput.current) {
                  photoInput.current.click();
                }
              }}
            >
              파일 찾기
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg,image/png,image/jpeg"
              name="profile_img"
              onChange={photoChange}
              ref={photoInput}
            ></input>
            <Button
              width="190px"
              height="35px"
              style={{
                marginLeft: 10,
                color: "#48a3a9",
                background: "white",
                border: "2px solid #48a3a9",
              }}
            >
              기본 이미지로 변경
            </Button>
          </div>
        </PhotoContainer>
        <ExtraContainer>
          <Label htmlFor="nicknameInput">닉네임</Label>
          <Input
            id="nicknameInput"
            name="nickname"
            height="50px"
            onChange={handleNicknameInput}
            style={{ margin: "10px auto" }}
          ></Input>
          <Label>직책</Label>
          <H3 style={{ margin: "10px auto" }}>팀원</H3>
          <H4>탈퇴</H4>
          <Button
            width="120px"
            height="35px"
            style={{ background: "#C74E4E", margin: "10px 0 5px" }}
          >
            그룹나가기
          </Button>
        </ExtraContainer>
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
      </Container>
    </LayoutContainer>
  );
}
