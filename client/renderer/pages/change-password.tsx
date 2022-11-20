import React, { useState } from "react";
import styled from "@emotion/styled";
import { H1, Input, Button, Label } from "../styles";
import { PATH } from "../constants";
import UserFormLink from "../molecule/UserFormLink";
import axios from "../utils/axios";
import { USERS_API } from "../constants";
import { AlertColor } from "@mui/material";
import CustomAlert from "../molecule/CustomAlert";

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 420px;
  height: 450px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FindContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 30px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ChangePassword() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [originalPw, setOriginalPw] = useState<string>("");
  const handleOriginalInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalPw(event.target.value);
  };
  const [newPw, setNewPw] = useState<string>("");
  const handleNewInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(event.target.value);
  };
  const [confirmPw, setConfirmPw] = useState<string>("");
  const handleConfirmInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(event.target.value);
  };

  const condition = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/;
  const conditionOriginal = condition.test(originalPw);
  const conditionNew = condition.test(newPw);
  const conditionSame = newPw === confirmPw;
  const conditionFinish = conditionOriginal && conditionNew && conditionSame;

  const submitNewPw = async () => {
    const credentials = { oldPassword: originalPw, newPassword: newPw };
    try {
      await axios.put(USERS_API.CHANGE, credentials, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setAlertMessage("비밀번호가 변경되었습니다.");
      setSeverity("success");
      setAlertOpen(true);
    } catch (error) {}
  };

  return (
    <LayoutContainer>
      <Container>
        <CustomAlert
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
          severity={severity}
        ></CustomAlert>
        <FindContainer>
          <TextContainer>
            <H1 style={{ color: "var(--main-color)" }}>O:RE</H1>
          </TextContainer>
          <InputContainer>
            <Label htmlFor="oldPassword">현재 비밀번호</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              placeholder="기존 비밀번호를 입력해주세요."
              type="password"
              height="40px"
              onChange={handleOriginalInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">새 비밀번호</Label>
            <Input
              id="password"
              name="password"
              placeholder="영문,숫자 포함 8~20자리, 특수문자는 @$!%*#?& 허용"
              type="password"
              height="40px"
              onChange={handleNewInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password2">새 비밀번호 확인</Label>
            <Input
              id="password2"
              name="password2"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              type="password"
              height="40px"
              onChange={handleConfirmInput}
            ></Input>
          </InputContainer>
          <ButtonContainer>
            <Button
              height="40px"
              onClick={submitNewPw}
              disabled={!conditionFinish}
              borderRadius="10px"
            >
              비밀번호 변경
            </Button>
          </ButtonContainer>
        </FindContainer>
      </Container>
    </LayoutContainer>
  );
}
