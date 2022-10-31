import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import TopBar from "../molecule/TopBar";
import GroupSideBar from "../molecule/GroupSideBar";
import PageSideBar from "../molecule/PageSideBar";
import NavBar from "../molecule/NavBar";
import { useRouter } from "next/router";
import { layoutInfo } from "../constants";

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
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--light-gray-color);
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end {
    background: transparent;
    margin-bottom: 10px;
  }
`;

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { pathname } = useRouter();

  return (
    <Container>
      <TopBar />
      {layoutInfo.onlyPage.has(pathname) ? (
        <PageContainer>{children}</PageContainer>
      ) : (
        <WrapBodyContainer>
          <GroupSideBar />
          <WrapMainContainer>
            <NavBar />
            {layoutInfo.withOnlyNavBar.has(pathname) ? (
              <PageContainer>{children}</PageContainer>
            ) : (
              <WrapPageContainer>
                <PageSideBar />
                <PageContainer>{children}</PageContainer>
              </WrapPageContainer>
            )}
          </WrapMainContainer>
        </WrapBodyContainer>
      )}
    </Container>
  );
}
