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
import CustomAlert from "./CustomAlert";
import { AlertColor } from "@mui/material";

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 5px auto;
`;

const RedButton = styled.button`
  background: white;
  color: #c74e4e;
  border: 2px solid #c74e4e;
  border-radius: 10px;
  :hover {
    background: #c74e4e;
    color: white;
    cursor: pointer;
  }
`;

const roles = {
  OWNER: "OWNER",
  LEADER: "LEADER",
  ADMIN: "ADMIN",
  USER: "USER",
};

export default function UserOption() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
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
      setAlertMessage("프로필 변경이 완료되었습니다.");
      setSeverity("success");
      setAlertOpen(true);
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
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={severity}
      ></CustomAlert>
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
        <RedButton
          style={{ width: "120px", height: "35px", borderRadius: "0" }}
          onClick={() => {
            Router.push("/change-password");
          }}
        >
          비밀번호 변경
        </RedButton>
      </InfoContainer>

      <ButtonContainer>
        <Button height="50px" onClick={submitEditProfile} borderRadius="10px">
          저장
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <RedButton
          style={{ width: "100%", height: "50px" }}
          onClick={submitLogout}
        >
          로그아웃
        </RedButton>
      </ButtonContainer>
    </>
  );
}
