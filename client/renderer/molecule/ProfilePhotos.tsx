import React, {
  useRef,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { BASIC_PHOTO_TEAM, BASIC_PHOTO_USER } from "../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PhotoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px 0 15px 0;
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  max-width: 120px;
  margin: 8px 0;
`;

const NoProfileContainer = styled.span`
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  border: 8px solid var(--super-light-main-color);
  font-size: 25px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px 0;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  margin: auto auto 0 30px;
`;

const BasicPhotoButton = styled.button`
  width: 190px;
  height: 35px;
  margin-left: 10px;
  color: #48a3a9;
  background: white;
  border: 2px solid #48a3a9;
  :hover& {
    cursor: pointer;
  }
`;

interface PhotoProps {
  photo: File | null;
  setPhoto: Dispatch<SetStateAction<File | null>>;
  photoUrl: string | ArrayBuffer | null;
  setPhotoUrl: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  teamName?: string;
}

export default function ProfilePhotos(props: PhotoProps) {
  const [teamName, setTeamName] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | ArrayBuffer | null>(props.photoUrl);
  useEffect(() => {
    setTeamName(props.teamName);
  }, [props.teamName]);
  useEffect(() => {
    setUrl(props.photoUrl);
  }, [props.photoUrl]);

  const photoInput = useRef<HTMLInputElement>(null);
  const photoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length !== 0) {
      props.setPhoto(event.target.files[0]);
    } else {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        props.setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const basicPhotoChange = () => {
    if (teamName === undefined) {
      props.setPhotoUrl(BASIC_PHOTO_USER);
    } else {
      props.setPhotoUrl(BASIC_PHOTO_TEAM);
    }
    props.setPhoto(null);
  };

  return (
    <Container>
      <Label>프로필 이미지</Label>
      <PhotoContainer>
        {url === BASIC_PHOTO_TEAM ? (
          <NoProfileContainer>{teamName}</NoProfileContainer>
        ) : (
          <ProfilePhoto
            src={
              typeof props.photoUrl === "string"
                ? props.photoUrl
                : "images/logo.png"
            }
          ></ProfilePhoto>
        )}
        <ButtonContainer>
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
          <BasicPhotoButton onClick={basicPhotoChange}>
            {teamName === undefined
              ? "기본 프로필로 변경"
              : "프로필 사진 없애기"}
          </BasicPhotoButton>
        </ButtonContainer>
      </PhotoContainer>
    </Container>
  );
}
