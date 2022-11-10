import React, { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setSelectTeamState, setTeamState } from "../slices/myTeamsStateSlice";
import { setUserProfileState } from "../slices/userProfileSlices";
import axios from "../utils/axios";
import { TEAM_USER_API, USERS_API, PATH } from "../constants";
import { TeamOptions } from "../types";
import Router from "next/router";
import { H1, Input, Label, Button } from "../styles";
import { setNavName } from "../slices/navNameSlice";

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 400px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OREContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 30px 0;
  text-align: center;
`;

const DomainInputContainer = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const domainLabelText = [
  { text: "도메인을 입력해주세요.", color: "black" },
  { text: "적합하지 않은 도메인 입니다.", color: "red" },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login).isLogin;
  // Domain 상태 및 조건 확인
  const [domainInput, setDomainInput] = useState<string>("http://");
  const conditionDomain: boolean =
    /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/.test(
      domainInput
    );
  function handleDomainInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setDomainInput("http://" + value);
  }

  const submitDomainInput = async () => {
    localStorage.setItem("domain", domainInput);
    try {
      const { data } = await axios.get(USERS_API.DOMAIN);
      const userNum: number = data.data;
      if (userNum === 0) {
        Router.push(PATH.SIGNUP);
      } else {
        Router.push(PATH.LOGIN);
      }
    } catch (e) {}
  };

  const setMyTeams = useCallback(async () => {
    try {
      const params = {
        page: 0,
        size: 20,
      };
      const { data } = await axios.get(TEAM_USER_API.LIST, {
        params,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const myTeams: Array<TeamOptions> = data.data.content;
      console.log(myTeams);
      dispatch(setTeamState(myTeams));
      dispatch(setSelectTeamState({ idx: 0, teamId: myTeams[0].teamId }));
      dispatch(setNavName(myTeams[0].name));
    } catch {}
  }, []);

  const setUserProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(USERS_API.MYPAGE, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      dispatch(setUserProfileState(data.data));
    } catch {}
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      setMyTeams();
      setUserProfile();
    }
  }, [isLogin]);

  return isLogin === true ? (
    <div>HOME</div>
  ) : (
    <LayoutContainer>
      <Container>
        <OREContainer>
          <H1 style={{ color: "var(--main-color)" }}>O:RE</H1>
        </OREContainer>
        <DomainInputContainer>
          <Label
            htmlFor="domainInput"
            color={
              domainInput !== "http://" && conditionDomain === false
                ? domainLabelText[1].color
                : domainLabelText[0].color
            }
            style={{ fontSize: "20px" }}
          >
            {domainInput !== "http://" && conditionDomain === false
              ? domainLabelText[1].text
              : domainLabelText[0].text}
          </Label>
          <Input
            id="domainInput"
            name="domain"
            placeholder="예시: example.com('http://'를 입력하지 말아주세요)"
            type="text"
            height="50px"
            onChange={handleDomainInput}
          ></Input>
        </DomainInputContainer>
        <ButtonContainer>
          <Button onClick={submitDomainInput} disabled={!conditionDomain}>
            확인
          </Button>
        </ButtonContainer>
      </Container>
    </LayoutContainer>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.getState();
//     return { props: {} };
//   }
// );
