import React, { useState } from "react";
import styled from "@emotion/styled";
import { H1, Input, Button, Label } from "../styles";
import UserModal from "../molecule/UserModal";
import Router from "next/router";
import { PATH } from "../constants";
import UserFormLink from "../molecule/UserFormLink";
import axios from "../utils/axios";
import { isAxiosError } from "../utils/axios";
import { USERS_API } from "../constants";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 480px;
`;

const Container = styled.div`
  width: 560px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 560px) {
    width: 80%;
  }
`;

const SignupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VeriContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

// Label Text
const nameLabelText = [
  { text: "이름", color: "black" },
  { text: "한글 2자 이상 10자 이하 입력해주세요.", color: "red" },
];
const emailLabelText = [
  { text: "이메일", color: "black" },
  { text: "유효하지 않은 이메일 입니다.", color: "red" },
];
const pwLabelText = [
  { text: "비밀번호", color: "black" },
  { text: "비밀번호가 조건에 맞지 않습니다.", color: "red" },
];
const confirmLabelText = [
  { text: "비밀번호 확인", color: "black" },
  { text: "비밀번호가 일치하지 않습니다.", color: "red" },
];

// ModalText
const emailModalText = [
  {
    title: "인증메일이 발송되었습니다.",
    content: (
      <>
        입력하신 이메일로 인증 메일이 발송되었습니다.
        <br />
        회원가입을 완료해주세요.
      </>
    ),
    needImage: true,
    imgSrc: "/images/sendmail.png",
  },
  {
    title: "중복된 이메일 입니다.",
    cotent: (
      <>
        다른 이메일을 사용하시거나 <br /> 로그인 해주세요.
      </>
    ),
    needImage: false,
    imgSrc: "",
  },
];

const codeModalText = [
  { title: "확인되었습니다.", content: "회원 가입을 계속 진행해주세요." },
  {
    title: "인증번호가 틀렸습니다.",
    content: (
      <>
        인증 번호를 맞게 입력해주시거나 <br /> 다시 발송 버튼을 눌러주세요.
      </>
    ),
  },
];

const LinkOptions = [
  { pathLink: PATH.MAIN, pathName: "메인페이지로" },
  { pathLink: PATH.LOGIN, pathName: "로그인" },
  { pathLink: PATH.FIND_PASSWORD, pathName: "비밀번호 찾기" },
];

export default function Signup() {
  // name 상태 및 조건 확인
  const [nameInput, setNameInput] = useState<string>("");
  const conditionName: boolean = /^[가-힣]{2,10}$/.test(nameInput);

  // Email 상태 및 조건 확인
  const [emailInput, setEmailInput] = useState<string>("");
  const conditionEmail: boolean = /^[\w+_]\w+@\w+\.\w+/.test(emailInput);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  // Email 중복 확인 후 코드 전송
  const sendEmailCode = async () => {
    type DuplicateResponseType = {
      code: number;
    };

    try {
      const params = {
        email: emailInput,
      };
      const res = await axios.get(USERS_API.VERIFICATION, {
        params,
      });
      setIsEmailDuplicated(false);
      setIsCodeSent(true);
      setOpenEmailModal(true);
    } catch (e: unknown) {
      if (isAxiosError<DuplicateResponseType>(e)) {
        if (e.response?.data.code === 40901) {
          setOpenEmailModal(true);
        }
      }
    }
  };

  // Email 인증 여부
  const [verificationCode, setverificationCode] = useState<string>("");
  const conditionCode: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(
    verificationCode
  );
  // 인증 코드 전송
  const veriEmail = async () => {
    try {
      const codeCredentials = {
        email: emailInput,
        code: verificationCode,
      };
      const { data } = await axios.post(
        USERS_API.VERIFICATION,
        codeCredentials
      );
      if (data.success === true) {
        setIsEmailVerificated(true);
        setOpenCodeModal(true);
      }
    } catch {}
  };

  // Password 상태 및 조건 확인
  const [pwInput, setPwInput] = useState<string>("");
  const conditionPassword: boolean =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/.test(pwInput);

  // Password 일치 확인
  const [pwConfirm, setPwConfirm] = useState<string>("");
  const isPwConfirmed: boolean = !!(pwInput === pwConfirm);

  // input state 변경
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmailInput(value);
    } else if (name === "password") {
      setPwInput(value);
    } else if (name === "password2") {
      setPwConfirm(value);
    } else if (name === "name") {
      setNameInput(value);
    } else if (name === "code") {
      setverificationCode(value);
    }
  }

  // 회원가입
  const handleSubmit = async () => {
    try {
      const credentials = {
        email: emailInput,
        password: pwInput,
        name: nameInput,
      };
      const { data } = await axios.post(USERS_API.SIGNUP, credentials);
      if (data.success === true) {
        setOpenSignupModal(true);
      }
    } catch {}
  };

  // modal
  // email 인증 보내기 모달
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(true);

  // 인증 번호 일치 확인 모달
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [isEmailVerificated, setIsEmailVerificated] = useState<boolean>(false);

  // 회원가입 완료 Modal
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const setLoginPage = (pathname: string) => {
    Router.push(pathname);
  };

  // 모든 조건 만족
  const conditionFinish =
    conditionName &&
    conditionEmail &&
    isEmailVerificated &&
    conditionPassword &&
    isPwConfirmed;

  return (
    <LayoutContainer>
      <Container>
        <SignupContainer>
          <TextContainer>
            <H1 style={{ color: "var(--main-color)" }}>O:RE</H1>
          </TextContainer>
          <InputContainer>
            <Label
              htmlFor="nameInput"
              color={
                nameInput !== "" && conditionName === false
                  ? nameLabelText[1].color
                  : nameLabelText[0].color
              }
            >
              {nameInput !== "" && conditionName === false
                ? nameLabelText[1].text
                : nameLabelText[0].text}
            </Label>
            <Input
              id="nameInput"
              name="name"
              placeholder="홍길동"
              type="text"
              height="40px"
              onChange={handleInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label
              htmlFor="emailInput"
              color={
                emailInput !== "" && conditionEmail === false
                  ? emailLabelText[1].color
                  : emailLabelText[0].color
              }
            >
              {emailInput !== "" && conditionEmail === false
                ? emailLabelText[1].text
                : emailLabelText[0].text}
            </Label>
            <VeriContainer>
              <Input
                id="emailInput"
                name="email"
                placeholder="example@example.com"
                type="text"
                width="75%"
                height="40px"
                onChange={handleInput}
                disabled={isCodeSent}
              ></Input>
              <Button
                width="23%"
                height="40px"
                onClick={sendEmailCode}
                disabled={!conditionEmail}
              >
                발송
              </Button>
            </VeriContainer>
            <UserModal
              open={openEmailModal}
              setOpen={setOpenEmailModal}
              needImage={
                isEmailDuplicated
                  ? emailModalText[1].needImage
                  : emailModalText[0].needImage
              }
              imgSrc={
                isEmailDuplicated
                  ? emailModalText[1].imgSrc
                  : emailModalText[0].imgSrc
              }
              needButton={true}
              title={
                isEmailDuplicated
                  ? emailModalText[1].title
                  : emailModalText[0].title
              }
              content={
                isEmailDuplicated
                  ? emailModalText[1].content
                  : emailModalText[0].content
              }
            ></UserModal>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="code">인증번호</Label>
            <UserModal
              needImage={false}
              needButton={true}
              open={openCodeModal}
              setOpen={setOpenCodeModal}
              title={
                isEmailVerificated
                  ? codeModalText[0].title
                  : codeModalText[1].title
              }
              content={
                isEmailVerificated
                  ? codeModalText[0].content
                  : codeModalText[1].content
              }
            ></UserModal>
            <VeriContainer>
              <Input
                id="code"
                name="code"
                placeholder="발송된 인증번호를 입력해주세요."
                type="text"
                width="75%"
                height="40px"
                onChange={handleInput}
              ></Input>
              <Button
                width="23%"
                height="40px"
                onClick={veriEmail}
                disabled={!conditionCode}
              >
                인증
              </Button>
            </VeriContainer>
          </InputContainer>
          <InputContainer>
            <Label
              htmlFor="password"
              color={
                pwInput !== "" && conditionPassword === false
                  ? pwLabelText[1].color
                  : pwLabelText[0].color
              }
            >
              {pwInput !== "" && conditionPassword === false
                ? pwLabelText[1].text
                : pwLabelText[0].text}
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="영문,숫자 포함 8~20자리, 특수문자는 @$!%*#?& 허용"
              type="password"
              height="40px"
              onChange={handleInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label
              htmlFor="password2"
              color={
                pwConfirm !== "" && isPwConfirmed === false
                  ? confirmLabelText[1].color
                  : confirmLabelText[0].color
              }
            >
              {pwConfirm !== "" && isPwConfirmed === false
                ? confirmLabelText[1].text
                : confirmLabelText[0].text}
            </Label>
            <Input
              id="password2"
              name="password2"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              type="password"
              height="40px"
              onChange={handleInput}
            ></Input>
          </InputContainer>
          <ButtonContainer>
            <UserModal
              needButton={true}
              needImage={false}
              open={openSignupModal}
              setOpen={setOpenSignupModal}
              pathname={PATH.LOGIN}
              setPage={setLoginPage}
              title="회원가입이 완료되었습니다."
            ></UserModal>
            <Button
              height="40px"
              disabled={!conditionFinish}
              onClick={handleSubmit}
            >
              회원가입
            </Button>
          </ButtonContainer>
          <UserFormLink
            firstPath={LinkOptions[0].pathLink}
            firstPathName={LinkOptions[0].pathName}
            secondPath={LinkOptions[1].pathLink}
            secondPathName={LinkOptions[1].pathName}
            thirdPath={LinkOptions[2].pathLink}
            thirdPathName={LinkOptions[2].pathName}
          ></UserFormLink>
        </SignupContainer>
      </Container>
    </LayoutContainer>
  );
}
