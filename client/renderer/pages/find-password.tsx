import React from "react";
import styled from "@emotion/styled";
import { H1, Input, Button, Label } from "../styles";
import Link from "next/link";

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

const CantFindContainer = styled.ul`
  width: 100%;
  text-align: center;
  padding: 0;
`;

const CantFindOptions = styled.li`
  display: inline-block;
  list-style: none;
  :first-child {
    border-right: 1px solid var(--main-color);
    padding-right: 10px;
    margin-right: 10px;
  }
  :last-child {
    border-left: 1px solid var(--main-color);
    padding-left: 10px;
    margin-left: 10px;
  }
  > a {
    color: var(--main-color);
  }
`;

export default function FindPassword() {
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
              height="60px"
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="emailInput">이메일</Label>
            <Input
              id="emailInput"
              placeholder="example@example.com"
              type="text"
              height="60px"
            ></Input>
          </InputContainer>
          <ButtonContainer>
            <Button height="60px">비밀번호 찾기</Button>
          </ButtonContainer>
          <CantFindContainer>
            <CantFindOptions>
              <Link href="/">메인페이지로</Link>
            </CantFindOptions>
            <CantFindOptions>
              <Link href="/login">로그인</Link>
            </CantFindOptions>
            <CantFindOptions>
              <Link href="#">회원가입</Link>
            </CantFindOptions>
          </CantFindContainer>
        </FindContainer>
      </Container>
    </LayoutContainer>
  );
}
