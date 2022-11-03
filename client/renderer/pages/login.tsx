import React, { useState } from "react";
import styled from "@emotion/styled";
import { H1, Input, Button } from "../styles";
import UserFormLink from "../molecule/UserFormLink";
import { PATH, USERS_API } from "../constants";
import axios from "../utils/axios";
import Router from "next/router";
import { setLogIn } from "../slices/loginSlices";
import { useAppDispatch } from "../hooks/reduxHook";

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const InputContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
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
  { pathLink: PATH.MAIN, pathName: "메인페이지로" },
  { pathLink: PATH.SIGNUP, pathName: "회원가입" },
  { pathLink: PATH.FIND_PASSWORD, pathName: "비밀번호 찾기" },
];

export default function Login() {
  const dispatch = useAppDispatch();

  const [emailInput, setEamilInput] = useState<string>("");
  const conditionEmail: boolean = /^[\w+_]\w+@\w+\.\w+/.test(emailInput);
  const [pwInput, setPwInput] = useState<string>("");
  const conditionPassword: boolean =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pwInput);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "email") {
      setEamilInput(value);
    } else if (name === "password") {
      setPwInput(value);
    }
  }

  const handleSubmit = async () => {
    try {
      const credentials = {
        email: emailInput,
        password: pwInput,
      };
      const { data } = await axios.post(USERS_API.LOGIN, credentials);
      if (data.success === true) {
        localStorage.setItem("token", data.data.token);
        dispatch(setLogIn("name"))
        Router.push(PATH.MAIN);
      }
    } catch(e) {console.log(e)}
  };

  return (
    <LayoutContainer>
      <Container>
        <LoginContainer>
          <TitleContainer>
            <H1 style={{ color: "var(--main-color)" }}>O:RE</H1>
          </TitleContainer>
          <InputContainer>
            <Input
              placeholder="email"
              name="email"
              type="text"
              height="60px"
              onChange={handleInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="password"
              name="password"
              type="password"
              height="60px"
              onChange={handleInput}
            ></Input>
          </InputContainer>
          <ButtonContainer>
            <Button
              height="60px"
              disabled={!(conditionEmail && conditionPassword)}
              onClick={handleSubmit}
            >
              로그인
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
        </LoginContainer>
      </Container>
    </LayoutContainer>
  );
}
