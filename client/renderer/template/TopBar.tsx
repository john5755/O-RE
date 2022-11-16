import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { BrowserWindow } from "electron";

const TopBarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 23px;
  background-color: var(--main-color);
  justify-content: space-between;
  -webkit-app-region: drag;
`;
const Logo = styled.div`
  width: 100%;
  color: white;
  margin-left: 10px;
`;
const Button = styled.div`
  height: 100%;
  width: 30px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  -webkit-app-region: no-drag;
  cursor: pointer;
  text-align: center;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ButtonClose = styled.div`
  height: 100%;
  width: 30px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  -webkit-app-region: no-drag;
  cursor: pointer;
  text-align: center;
  :hover {
    background-color: rgb(255, 15, 0);
    color: white;
  }
`;

export default function TopBar() {
  const [ipcRenderer, setIpcRenderer] = useState<
    undefined | Electron.IpcRenderer
  >(undefined);

  useEffect(() => {
    if (window.require !== undefined) {
      setIpcRenderer(window.require("electron").ipcRenderer);
    }
  }, []);

  return (
    <>
      {ipcRenderer !== undefined ? (
        <TopBarWrapper>
          <Logo>O:RE</Logo>

          <Button
            onClick={() => {
              ipcRenderer?.send("window-minimize");
            }}
          >
            <HorizontalRuleIcon
              fontSize="inherit"
              sx={{ height: "100%" }}
            ></HorizontalRuleIcon>
          </Button>
          <Button
            onClick={() => {
              ipcRenderer?.send("window-toggle-maximize");
            }}
          >
            <CropSquareIcon
              fontSize="inherit"
              sx={{ height: "100%" }}
            ></CropSquareIcon>
          </Button>

          <ButtonClose
            onClick={() => {
              ipcRenderer?.send("closeApp");
            }}
          >
            <CloseIcon fontSize="inherit" sx={{ height: "100%" }}></CloseIcon>
          </ButtonClose>
        </TopBarWrapper>
      ) : null}
    </>
  );
}
