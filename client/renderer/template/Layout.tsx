import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "@emotion/styled";
import TopBar from "../molecule/TopBar";
import GroupSideBar from "../molecule/GroupSideBar";
import PageSideBar from "../molecule/PageSideBar";
import NavBar from "../molecule/NavBar";
import { useRouter } from "next/router";
import { pageInfo } from "../hooks/pageHook";

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
`;

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { pathname } = useRouter();

  return (
    <Container>
      <TopBar />
      {pageInfo.account.has(pathname) ? (
        <PageContainer>{children}</PageContainer>
      ) : (
        <WrapBodyContainer>
          <GroupSideBar />
          <WrapMainContainer>
            <NavBar />
            {pageInfo.createGroup.has(pathname) ? (
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
