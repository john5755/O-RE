import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { H2, Input, Button, Label } from "../styles";
import { useAppDispatch } from "../hooks/reduxHook";
import { addGroupState } from "../slices/myGroupsState";
import { BASIC_PHOTO_URL } from "../constants";

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
  margin: 8px 3px 0 auto;
`;

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

export default function CreateGroup() {
  const dispatch = useAppDispatch();
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

  // groupname 변경
  const [groupName, setGroupName] = useState<string>("");
  function handleGroupNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(event.target.value);
  }

  return (
    <LayoutContainer>
      <Container>
        <TextContainer>
          <H2 style={{ fontWeight: "bold" }}>그룹 생성</H2>
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
          <Label htmlFor="groupNameInput">그룹명</Label>
          <Input
            id="groupNameInput"
            name="groupName"
            style={{ margin: "10px auto" }}
            height="50px"
            onChange={handleGroupNameInput}
          ></Input>
          <ButtonContainer>
            <Button
              height="50px"
              onClick={() => {
                dispatch(
                  addGroupState({ name: groupName, profileUrl: photoUrl })
                );
              }}
            >
              저장
            </Button>
          </ButtonContainer>
        </NameContainer>
      </Container>
    </LayoutContainer>
  );
}
