import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { AlertColor } from "@mui/material";
import styled from "@emotion/styled";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useClickOther } from "../hooks/resetPageHook";
import { PATH, TEAM_ROLE, TEAM_USER_API } from "../constants";
import { setNavName } from "../slices/navNameSlice";
import axios from "../utils/axios";
import { TeamOptions } from "../types";
import { setSelectTeamState, setTeamState } from "../slices/myTeamsStateSlice";
import { useResetTeamAndPage } from "../hooks/resetTeamAndPage";
import CustomAlert from "./CustomAlert";

const ITEM_HEIGHT = 48;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function TeamOptionDropDown() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navInfo = useAppSelector((state) => state.navName);
  const teamInfo = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const dispatch = useAppDispatch();
  const clickOther = useClickOther();
  const reset = useResetTeamAndPage();

  const handleTeamLeave = async () => {
    try {
      await axios.delete(`${TEAM_USER_API.INVITE}/${teamInfo.teamId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
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
      if (data.data.content.length === 0) {
        reset();
        Router.push("/");
      } else {
        const myTeams: Array<TeamOptions> = data.data.content;
        dispatch(setTeamState(myTeams));
        dispatch(
          setSelectTeamState({
            idx: 0,
            teamId: myTeams[0].teamId,
          })
        );
        dispatch(setNavName(myTeams[0].name));
      }
    } catch (e: any) {
      setAlertMessage(e?.response?.data?.message);
      setSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={severity}
      ></CustomAlert>
      <IconContainer onClick={handleClick}>
        <SettingsIcon />
      </IconContainer>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {TEAM_ROLE.MANAGER.includes(teamList[teamInfo.idx]?.teamUserRole) && (
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(setNavName(`${navInfo.navName}팀 관리`));
              Router.push(PATH.MANAGE_TEAM);
              clickOther();
            }}
            style={{ fontSize: "14px" }}
          >
            팀 설정
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            handleTeamLeave();
          }}
          style={{ color: "red", fontSize: "14px" }}
        >
          팀 떠나기
        </MenuItem>
      </Menu>
    </div>
  );
}
