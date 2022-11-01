import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { H2, H3, H4, Label, Button, Input } from "../styles";
import { BASIC_PHOTO_URL } from "../constants";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

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

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const MemberContainer = styled.div`
  width: 100%;
`;

const HorizonBar = styled.hr`
  border-color: var(--light-main-color);
`;

const groupPositions = ["리더", "관리자", "사용자"];
const groupMembers = [
  { name: "박싸피", position: "LEADER" },
  { name: "치싸피", position: "MANAGER" },
  { name: "홍길동", position: "USER" },
  { name: "맘모쓰", position: "USER" },
];

export default function ManageGroup() {
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

  // position dropdown
  const [position, setPosition] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  return (
    <LayoutContainer>
      <Container>
        <TextContainer>
          <H2 style={{ fontWeight: "bold" }}>그룹 관리</H2>
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
        <NameContainer>
          <Label htmlFor="nicknameInput">그룹 이름</Label>
          <Input
            id="nicknameInput"
            name="nickname"
            height="50px"
            onChange={handleNicknameInput}
            style={{ margin: "10px auto" }}
          ></Input>
        </NameContainer>
        <TextContainer>
          <H3 style={{ fontWeight: 550 }}>멤버 관리</H3>
        </TextContainer>
        <MemberContainer>
          <Label>멤버 목록</Label>
          {groupMembers.map((member, idx) => (
            <div key={idx}>
              <H4>{member.name}</H4>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">직책</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position}
                    label="직책"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>리더</MenuItem>
                    <MenuItem value={20}>관리자</MenuItem>
                    <MenuItem value={30}>사용자</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <HorizonBar></HorizonBar>
            </div>
          ))}
        </MemberContainer>
      </Container>
    </LayoutContainer>
  );
}
