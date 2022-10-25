import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "@emotion/styled";
import TopBar from "../molecule/TopBar";
import GroupSideBar from "../molecule/GroupSideBar";
import PageSideBar from "../molecule/PageSideBar";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const WrapBodyContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 70px 240px auto;
  background-color: var(--main-color);
`;
const PageContainer = styled.div`
  background-color: white;
`;

export default function Layout({ children }: PropsWithChildren<{}>) {
  const [ipcRenderer, setIpcRenderer] = useState<
    undefined | Electron.IpcRenderer
  >(undefined);

  useEffect(() => {
    if (window.require !== undefined) {
      setIpcRenderer(window.require("electron").ipcRenderer);
    }
  }, []);

  return (
    <Container>
      <TopBar ipcRenderer={ipcRenderer} />
      <WrapBodyContainer>
        <GroupSideBar />
        <PageSideBar />
        <PageContainer>{children}</PageContainer>
      </WrapBodyContainer>
    </Container>
  );
}
