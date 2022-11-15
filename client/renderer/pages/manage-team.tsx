import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import { PATH, TEAM_API, TEAM_USER_API, USERS_API } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import { TeamUserType } from "../types";
import SearchBarTab from "../molecule/SearchBarTab";
import axios from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { delTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";
import { useClickTeam } from "../hooks/resetPageHook";
import SearchItemRole from "../molecule/SerachItemRole";
import SearchTeamAdd from "../molecule/SearchTeamAdd";
import { Tab, Tabs, Box } from "@mui/material";
import TeamMemberAdd from "../molecule/TeamMemberAdd";
import TeamMemberSet from "../molecule/TeamMemberSet";
import TeamProfile from "../molecule/TeamProfile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 560px) {
    width: 80%;
  }
  min-width: 480px;
  max-width: 560px;
`;

const TeamProfileContainer = styled.div`
  width: 100%;
`;

const TeamMemberManageContainer = styled.div`
  width: 100%;
`;

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const MemberListContainer = styled.div`
  width: 100%;
`;

const MemberLabelContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const ResultContainer = styled.div`
  height: 220px;
  padding: 5px;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  height: 40px;
  margin: 20px auto;
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// serach dropdown
const searchMenues = { name: "이름", nickName: "닉네임" };
// result dropdown
const teamRoleMenues = {
  OWNER: "오너",
  LEADER: "리더",
  MANAGER: "관리자",
  MEMBER: "사용자",
};

export default function ManageTeam() {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const dispatch = useAppDispatch();
  const clickTeam = useClickTeam();

  return teamId !== -1 ? (
    <LayoutContainer>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "white" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                ".MuiButtonBase-root": {
                  color: "gray",
                  "&.Mui-selected": {
                    color: "var(--main-color)",
                  },
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "var(--main-color)",
                },
              }}
            >
              <Tab
                label="팀 프로필 설정"
                {...a11yProps(0)}
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="팀 멤버 관리"
                {...a11yProps(1)}
                sx={{ fontWeight: "bold" }}
              />{" "}
              <Tab
                label="팀 멤버 추가"
                {...a11yProps(2)}
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TeamProfile></TeamProfile>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TeamMemberSet></TeamMemberSet>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TeamMemberAdd></TeamMemberAdd>
          </TabPanel>
        </Box>
      </Container>
    </LayoutContainer>
  ) : (
    <></>
  );
}
