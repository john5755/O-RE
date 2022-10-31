import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Button, Input, Label } from "../styles";

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

const PhotoContainer = styled.div`
  width: 100%;
  margin: 10px 0 15px 0;
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  max-width: 150px;
  margin: 8px auto 0 auto;
`;

const ExtraContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;
const BASIC_PHOTO_URL: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/TeamDefaultImg.png";

export default function AccountOptions() {
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    BASIC_PHOTO_URL
  );
  const photoInput = useRef<HTMLInputElement>(null);
  const photoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length !== 0) {
      setPhoto(event.target.files[0]);
    } else {
      // 업로드 취소시
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
  // 기본 프로필로 변경
  const basicPhotoChange = () => {
    setPhotoUrl(BASIC_PHOTO_URL);
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
              onClick={basicPhotoChange}
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
          <H3 style={{ margin: "5px auto" }}>팀원</H3>
          <Label style={{ display: "block" }}>탈퇴</Label>
          <Button
            width="120px"
            height="35px"
            style={{ background: "#C74E4E", margin: "3px 0 3px" }}
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
