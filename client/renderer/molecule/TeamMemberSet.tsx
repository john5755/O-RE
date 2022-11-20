import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { TEAM_USER_API } from "../constants";
import { TeamUserType } from "../types";
import SearchBarTab from "../molecule/SearchBarTab";
import axios from "../utils/axios";
import { useAppSelector } from "../hooks/reduxHook";
import { Tab, Tabs, Box } from "@mui/material";
import SearchItemRole from "../molecule/SerachItemRole";
import RoleMemberAdd from "./RoleMemeverAdd";
import DelMemberAdd from "./DelMemberAdd";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TeamMemberManageContainer = styled.div`
  width: 100%;
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

const searchMenues = { name: "이름", nickName: "닉네임" };
const teamRoleMenues = {
  OWNER: "OWNER",
  LEADER: "LEADER",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER",
};

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

export default function TeamMemberSet() {
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const [roleChangeList, setRoleChangeList] = useState<Array<TeamUserType>>([]);
  const [memberRemoveList, setMemberRemoveList] = useState<Array<TeamUserType>>(
    []
  );
  const [nameCategoryMember, setNameCategoryMember] = useState<string>("name");
  const [searchTeamInput, setSearchTeamInput] = useState<string>("");
  const [teamMemberPage, setTeamMemberPage] = useState<number>(-1);
  const [teamIo, setTeamIo] = useState<IntersectionObserver | null>(null);
  const [isLoadedTeam, setIsLoadedTeam] = useState<boolean>(true);
  const [isSearchLastTeam, setIsSearchLastTeam] = useState<boolean>(false);
  const handleTeamSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTeamInput(event.target.value);
  };
  const [searchTeamResultList, setSearchTeamResultList] = useState<
    Array<TeamUserType>
  >([]);
  const registerObservingElTeam = (el: Element) => {
    if (teamIo !== null) {
      teamIo.observe(el);
    }
  };

  function setScrollTargetMember() {
    const currentTargetClassMember = `${teamMemberPage}페이지`;
    const target = document.getElementsByClassName(currentTargetClassMember)[0];
    if (target) {
      registerObservingElTeam(target);
    }
  }

  useEffect(() => {
    if (searchTeamResultList.length > 0) {
      setIsLoadedTeam(true);
    }
  }, [searchTeamResultList.length]);

  useEffect(() => {
    if (isLoadedTeam) {
      setScrollTargetMember();
    }
  }, [isLoadedTeam]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoadedTeam(false);
          setTeamMemberPage(teamMemberPage + 1);
          if (teamIo !== null) {
            teamIo.disconnect();
          }
        }
      });
    });
    setTeamIo(targetObserver);
    fetchTeamResultList();
  }, [teamMemberPage]);

  useEffect(() => {
    if (searchTeamInput !== "" || teamMemberPage !== -1) {
      setSearchTeamResultList([]);
      setTeamMemberPage(-1);
      setIsSearchLastTeam(false);
      fetchTeamResultList();
    }
  }, [searchTeamInput]);

  useEffect(() => {
    setIsSearchLastTeam(false);
    if (teamMemberPage === 1) {
      setTeamMemberPage(-1);
    } else {
      setTeamMemberPage(teamMemberPage - 1);
    }
    fetchTeamResultList();
  }, [roleChangeList.length, memberRemoveList.length]);

  const fetchTeamResultList = async () => {
    if (isSearchLastTeam === true || teamMemberPage === 0) {
      return;
    }
    if (searchTeamInput === "") {
      const page = teamMemberPage === -1 ? 0 : teamMemberPage;
      try {
        const params = {
          teamId: teamId,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.USERLIST, {
          params,
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        if (teamMemberPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
        } else {
          const filteredList = searchTeamResultList.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
          setSearchTeamResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastTeam(data.data.last);
        if (teamMemberPage === -1) {
          setTeamMemberPage(0);
          setIsLoadedTeam(false);
        }
      } catch (error) {}
    } else if (nameCategoryMember === "name") {
      const page = teamMemberPage === -1 ? 0 : teamMemberPage;
      try {
        const params = {
          teamId: teamId,
          name: searchTeamInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (teamMemberPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
        } else {
          const filteredList = searchTeamResultList.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
          setSearchTeamResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastTeam(data.data.last);
        if (teamMemberPage === -1) {
          setTeamMemberPage(0);
          setIsLoadedTeam(false);
        }
      } catch {}
    } else if (nameCategoryMember === "nickName") {
      const page = teamMemberPage === -1 ? 0 : teamMemberPage;
      try {
        const params = {
          teamId: teamId,
          nickName: searchTeamInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (teamMemberPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
        } else {
          const filteredList = searchTeamResultList.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchTeamResultList(filteredList);
          setSearchTeamResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastTeam(data.data.last);
        if (teamMemberPage === -1) {
          setTeamMemberPage(0);
          setIsLoadedTeam(false);
        }
      } catch {}
    }
  };
  const [roleChangeIdList, setRoleChangeIdList] = useState<
    Array<{ teamUserId: number; role: string }>
  >([]);

  const [memberRemoveIdList, setMemberRemoveIdList] = useState<Array<number>>(
    []
  );

  const [currentChangeRole, setCurrentChangeRole] = useState<string>("");
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const tempChangeCurrentTeam = (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => {
    if (buttonText === "변경") {
      setRoleChangeIdList((prev) => {
        return [...prev, { teamUserId: userId, role: role }];
      });
      setCurrentChangeRole(role);
      const target = searchTeamResultList.find(
        (member) => member.teamUserId === userId
      );
      if (target !== undefined) {
        setRoleChangeList((prev) => {
          return [...prev, target];
        });
        setTabValue(0);
      }
    } else if (buttonText === "취소") {
      setRoleChangeIdList((prev) =>
        prev.filter((user) => user.teamUserId !== userId)
      );
      setRoleChangeList((prev) =>
        prev.filter((user) => user.teamUserId !== userId)
      );
    } else if (buttonText === "삭제") {
      setMemberRemoveIdList((prev) => {
        return [...prev, userId];
      });
      const target = searchTeamResultList.find(
        (member) => member.teamUserId === userId
      );
      if (target !== undefined) {
        setMemberRemoveList((prev) => {
          return [...prev, target];
        });
        setTabValue(1);
      }
    } else if (buttonText === "복구") {
      setMemberRemoveIdList((prev) => prev.filter((id) => id !== userId));
      setMemberRemoveList((prev) =>
        prev.filter((user) => user.teamUserId !== userId)
      );
    }
  };

  const submitTeamRoleChange = async () => {
    try {
      const { data } = await axios.patch(
        `${TEAM_USER_API.INVITE}/${teamId}`,
        roleChangeIdList,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );
      setRoleChangeIdList([]);
      setSearchTeamResultList([]);
      setRoleChangeList([]);
      setTeamMemberPage(-1);
      setIsSearchLastTeam(false);
    } catch {}
  };

  const submitRemoveTeamMember = async () => {
    try {
      const body = { teamId: teamId, teamUserIdList: memberRemoveIdList };
      const { data } = await axios.delete(TEAM_USER_API.REMOVE, {
        data: body,
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setMemberRemoveIdList([]);
      setSearchTeamResultList([]);
      setMemberRemoveList([]);
      setTeamMemberPage(-1);
      setIsSearchLastTeam(false);
    } catch (error) {}
  };

  return teamId !== -1 ? (
    <TeamMemberManageContainer>
      <MemberListContainer>
        <MemberLabelContainer>
          <Label style={{ marginRight: 10 }}>팀원 관리</Label>
        </MemberLabelContainer>
        <SearchBarTab
          category={nameCategoryMember}
          setCategory={setNameCategoryMember}
          MenuItems={searchMenues}
          handleSearchInput={handleTeamSearchInput}
          fetchResultList={fetchTeamResultList}
        ></SearchBarTab>
        {searchTeamResultList.length === 0 ? (
          <></>
        ) : (
          <ResultContainer>
            {searchTeamResultList.map((member, idx) => (
              <SearchItemRole
                key={idx}
                member={member}
                MenuItems={teamRoleMenues}
                buttonFunction={tempChangeCurrentTeam}
              ></SearchItemRole>
            ))}
            {searchTeamResultList.length !== 0 && isLoadedTeam && (
              <div className={`${teamMemberPage}페이지`}>
                검색 결과가 더 없습니다.
              </div>
            )}
          </ResultContainer>
        )}
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
                label="변경 목록"
                {...a11yProps(0)}
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="삭제 목록"
                {...a11yProps(1)}
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {roleChangeList.map((member, idx) => (
              <RoleMemberAdd
                key={idx}
                member={member}
                role={currentChangeRole}
                buttonFunction={tempChangeCurrentTeam}
              ></RoleMemberAdd>
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {memberRemoveList.map((member, idx) => (
              <DelMemberAdd
                key={idx}
                member={member}
                buttonFunction={tempChangeCurrentTeam}
              ></DelMemberAdd>
            ))}
          </TabPanel>
        </Box>
        <ButtonContainer>
          <Button
            width="45%"
            borderRadius="10px"
            onClick={submitTeamRoleChange}
            style={{ marginLeft: "10px" }}
          >
            권한 변경
          </Button>
          <Button
            width="45%"
            borderRadius="10px"
            background="#C74E4E"
            onClick={submitRemoveTeamMember}
          >
            팀원 퇴출
          </Button>
        </ButtonContainer>
      </MemberListContainer>
    </TeamMemberManageContainer>
  ) : (
    <></>
  );
}
