import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Button, Label, Input } from "../styles";
import ProfilePhotos from "./ProfilePhotos";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { setUserProfileState } from "../slices/userProfileSlices";
import axios from "../utils/axios";
import { USERS_API } from "../constants";
import { persistor } from "../store";
import Router from "next/router";

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
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    userProfile.profileImage
  );
  const [nickname, setNickName] = useState<string>(userProfile.nickname);

  function handleNicknameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNickName(event.target.value);
  }
  const submitEditProfile = async () => {
    const profileInfoJson = {
      nickname: nickname,
      imageUrl: photoUrl,
    };
    const profileInfo = JSON.stringify(profileInfoJson);
    const formData = new FormData();
    if (photo !== null) {
      formData.append("profileImage", photo);
    }
    formData.append(
      "profileInfo",
      new Blob([profileInfo], { type: "application/json" })
    );
    try {
      await axios.put(USERS_API.MYPAGE, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const { data } = await axios.get(USERS_API.MYPAGE, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      dispatch(setUserProfileState(data.data));
    } catch (e) {}
  };

  const submitLogout = async () => {
    try {
      await axios.post(
        USERS_API.LOGOUT,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessExpiredAt");
      localStorage.removeItem("refreshExpiredAt");
      persistor.purge();
      Router.push("/login");
    } catch (e) {}
  };
  return (
    <>
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
          onClick={submitLogout}
        >
          로그아웃
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button height="50px" onClick={submitEditProfile}>
          저장
        </Button>
      </ButtonContainer>
    </>
  );
}
