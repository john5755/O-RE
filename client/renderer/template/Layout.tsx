import React, { PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import TopBar from "../molecule/TopBar";
import TeamSideBar from "../molecule/TeamSideBar";
import PageSideBar from "../molecule/PageSideBar";
import NavBar from "../molecule/NavBar";
import { useRouter } from "next/router";
import { layoutInfo } from "../constants";
import { useAppSelector } from "../hooks/reduxHook";
import { SelectTeamType } from "../types";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const WrapBodyContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 70px auto;
`;

const WrapMainContainer = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  background-color: var(--main-color);
`;

const WrapPageContainer = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
`;

const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { pathname } = useRouter();
  const isLogin = useAppSelector((state) => state.login).isLogin;
  const [selectedTeamId, setSelectedTeamId] = useState<SelectTeamType>({
    idx: -1,
    teamId: -1,
  });

  return (
    <Container>
      <TopBar />
      {layoutInfo.onlyPage.has(pathname) || !isLogin ? (
        <PageContainer>{children}</PageContainer>
      ) : (
        <WrapBodyContainer>
          <TeamSideBar
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
          />
          <WrapMainContainer>
            <NavBar
              selectedTeamId={selectedTeamId}
              setSelectedTeamId={setSelectedTeamId}
            />
            {layoutInfo.withOnlyNavBar.has(pathname) ? (
              <PageContainer>{children}</PageContainer>
            ) : (
              <WrapPageContainer>
                <PageSideBar selectedTeamId={selectedTeamId} />
                <PageContainer>{children}</PageContainer>
              </WrapPageContainer>
            )}
          </WrapMainContainer>
        </WrapBodyContainer>
      )}
    </Container>
  );
}
