import React, { useRef, SetStateAction, Dispatch } from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { BASIC_PHOTO_URL } from "../constants";

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

interface PhotoProps {
  photo: File | null;
  setPhoto: Dispatch<SetStateAction<File | null>>;
  photoUrl: string | ArrayBuffer | null;
  setPhotoUrl: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}

export default function ProfilePhotos(props: PhotoProps) {
  // profile 사진 설정
  const photoInput = useRef<HTMLInputElement>(null);
  const photoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length !== 0) {
      props.setPhoto(event.target.files[0]);
    } else {
      // 업로드 취소시
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        props.setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  // 기본 프로필로 변경
  const basicPhotoChange = () => {
    props.setPhotoUrl(BASIC_PHOTO_URL);
    props.setPhoto(null);
  };
  return (
    <PhotoContainer>
      <Label>프로필 이미지</Label>
      <div>
        <ProfilePhoto
          src={
            typeof props.photoUrl === "string"
              ? props.photoUrl
              : "images/logo.png"
          }
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
  );
}
