import React, { useState } from "react";
import styled from "@emotion/styled";
import { H1, Input, Button, Label } from "../styles";
import { PATH } from "../constants";
import UserFormLink from "../molecule/UserFormLink";
import axios from "../utils/axios";
import { USERS_API } from "../constants";
import UserModal from "../molecule/UserModal";

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 400px;
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

const LinkOptions = [
  { pathLink: PATH.MAIN, pathName: "도메인 입력" },
  { pathLink: PATH.LOGIN, pathName: "로그인" },
];

const emailModalText = [
  {
    title: "인증메일이 발송되었습니다.",
    content: (
      <>
        입력하신 이메일로 임시 비밀번호가 발송되었습니다.
        <br />
        임시 비밀번호로 로그인 하신 후 비밀번호를 변경해주세요.
      </>
    ),
    needImage: true,
    imgSrc: "/images/sendmail.png",
  },
  {
    title: "사용자를 확인할 수 없습니다.",
    cotent: (
      <>
        이메일이 잘못 되었거나 <br /> 이름을 다시 확인 해주세요.
      </>
    ),
    needImage: false,
    imgSrc: "",
  },
];

export default function FindPassword() {
  const [nameInput, setNameInput] = useState<string>("");
  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const conditionName: boolean = /^[가-힣]{2,10}$/.test(nameInput);

  const [emailInput, setEmailInput] = useState<string>("");
  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };
  const conditionEmail: boolean = /^[\w+_]\w+@\w+\.\w+/.test(emailInput);

  const conditionFinish: boolean = conditionName && conditionEmail;

  const submitFindPassword = async () => {
    const credentials = { email: emailInput, name: nameInput };
    try {
      await axios.post(USERS_API.FIND, credentials);
      setUserConfirmed(true);
      setOpenModal(true);
    } catch (e) {
      setUserConfirmed(false);
      setOpenModal(true);
    }
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userConfirmed, setUserConfirmed] = useState<boolean>(true);

  return (
    <LayoutContainer>
      <Container>
        <FindContainer>
          <TextContainer>
            <H1 style={{ color: "var(--main-color)" }}>O:RE</H1>
          </TextContainer>
          <InputContainer>
            <Label htmlFor="nameInput">이름</Label>
            <Input
              id="nameInput"
              placeholder="홍길동"
              type="text"
              height="50px"
              onChange={handleNameInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="emailInput">이메일</Label>
            <Input
              id="emailInput"
              placeholder="example@example.com"
              type="text"
              height="50px"
              onChange={handleEmailInput}
            ></Input>
            <UserModal
              needImage={userConfirmed}
              needButton={true}
              open={openModal}
              setOpen={setOpenModal}
              imgSrc={
                userConfirmed
                  ? emailModalText[0].imgSrc
                  : emailModalText[1].imgSrc
              }
              title={
                userConfirmed
                  ? emailModalText[0].title
                  : emailModalText[1].title
              }
              content={
                userConfirmed
                  ? emailModalText[0].content
                  : emailModalText[1].content
              }
            ></UserModal>
          </InputContainer>
          <ButtonContainer>
            <Button
              height="50px"
              disabled={!conditionFinish}
              onClick={submitFindPassword}
            >
              비밀번호 찾기
            </Button>
          </ButtonContainer>
          <UserFormLink
            firstPath={LinkOptions[0].pathLink}
            firstPathName={LinkOptions[0].pathName}
            secondPath={LinkOptions[1].pathLink}
            secondPathName={LinkOptions[1].pathName}
          ></UserFormLink>
        </FindContainer>
      </Container>
    </LayoutContainer>
  );
}
