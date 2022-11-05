import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, Input, Button, Label } from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addGroupState } from "../slices/myGroupsStateSlice";
import { BASIC_PHOTO_URL } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";

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

export default function CreateGroup() {
  const dispatch = useAppDispatch();
  const myGroups = useAppSelector((state) => state.myGroupsState).myGroupsState;
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    BASIC_PHOTO_URL
  );

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
        <ProfilePhotos
          photo={photo}
          setPhoto={setPhoto}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
        ></ProfilePhotos>
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
                  addGroupState({
                    teamId: myGroups.length,
                    name: groupName,
                    profileUrl: photoUrl,
                  })
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
