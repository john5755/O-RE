import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { TEAM_USER_API, PAGE_USER_API } from "../constants";
import { PageUserType, TeamUserType } from "../types";
import SearchBarTab from "../molecule/SearchBarTab";
import axios from "../utils/axios";
import { useAppSelector } from "../hooks/reduxHook";
import SearchPageRole from "./SearchPageRole";
import DelMemberAdd from "./DelMemberAdd";
import { Tab, Tabs, Box } from "@mui/material";
import RoleMemberAdd from "./RoleMemeverAdd";

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

const pageRoleMenues = {
  OWNER: "OWNER",
  MAINTAINER: "MAINTAINER",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
};

type PageMemberRole = {
  pageId: string | string[];
  role: string | string[];
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

export default function PageMemberRole(props: PageMemberRole) {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const pageId = typeof props.pageId === "string" ? props.pageId : "";
  const pageRole = typeof props.role === "string" ? props.role : "";
  const [nameCategory, setNameCategory] = useState<string>("name");
  const [searchInput, setSearchInput] = useState<string>("");
  const [userPage, setUserPage] = useState<number>(-1);
  const [io, setio] = useState<IntersectionObserver | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isSearchLast, setIsSearchLast] = useState<boolean>(false);
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const [searchResultList, setSearchResultList] = useState<Array<PageUserType>>(
    []
  );
  const [currentChangeRole, setCurrentChangeRole] = useState<string>("");
  const [roleChangeList, setRoleChangeList] = useState<Array<PageUserType>>([]);
  const [memberRemoveList, setMemberRemoveList] = useState<Array<PageUserType>>(
    []
  );

  const registerObservingEl = (el: Element) => {
    if (io !== null) {
      io.observe(el);
    }
  };

  function setScrollTargetMember() {
    const currentTargetClassMember = `${userPage}페이지`;
    const target = document.getElementsByClassName(currentTargetClassMember)[0];
    if (target) {
      registerObservingEl(target);
    }
  }

  useEffect(() => {
    if (searchResultList.length > 0) {
      setIsLoaded(true);
    }
  }, [searchResultList.length]);

  useEffect(() => {
    if (isLoaded) {
      setScrollTargetMember();
    }
  }, [isLoaded]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(false);
          setUserPage(userPage + 1);
          if (io !== null) {
            io.disconnect();
          }
        }
      });
    });
    setio(targetObserver);
    fetchResultList();
  }, [userPage]);

  useEffect(() => {
    if (searchInput !== "" || userPage !== -1) {
      setSearchResultList([]);
      setUserPage(-1);
      setIsSearchLast(false);
      fetchResultList();
    }
  }, [searchInput]);

  useEffect(() => {
    setIsSearchLast(false);
    if (userPage === 1) {
      setUserPage(-1);
    } else {
      setUserPage(userPage - 1);
    }
    fetchResultList();
  }, [roleChangeList.length, memberRemoveList.length]);

  const fetchResultList = async () => {
    if (isSearchLast === true || userPage === 0) {
      return;
    }
    if (searchInput === "") {
      const page = userPage === -1 ? 0 : userPage;
      try {
        const params = {
          page: page,
          size: 20,
        };
        const { data } = await axios.get(`${PAGE_USER_API.SEARCH}/${pageId}`, {
          params,
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        if (userPage === -1) {
          const filteredList = data.data.content.filter(
            (user: PageUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.pageUserId === user.pageUserId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.pageUserId === user.pageUserId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = searchResultList.filter((user: PageUserType) => {
            return (
              !roleChangeList.some(
                (changeUser) => changeUser.pageUserId === user.pageUserId
              ) &&
              !memberRemoveList.some(
                (removeUser) => removeUser.pageUserId === user.pageUserId
              )
            );
          });
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (userPage === -1) {
          setUserPage(0);
          setIsLoaded(false);
        }
      } catch (error) {}
    } else if (nameCategory === "name") {
      const page = userPage === -1 ? 0 : userPage;
      try {
        const params = {
          pageId: pageId,
          name: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(PAGE_USER_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (userPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.pageUserId === user.pageUserId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.pageUserId === user.pageUserId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = searchResultList.filter((user: PageUserType) => {
            return (
              !roleChangeList.some(
                (changeUser) => changeUser.pageUserId === user.pageUserId
              ) &&
              !memberRemoveList.some(
                (removeUser) => removeUser.pageUserId === user.pageUserId
              )
            );
          });
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (userPage === -1) {
          setUserPage(0);
          setIsLoaded(false);
        }
      } catch {}
    } else if (nameCategory === "nickName") {
      const page = userPage === -1 ? 0 : userPage;
      try {
        const params = {
          pageId: pageId,
          nickName: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(PAGE_USER_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (userPage === -1) {
          const filteredList = data.data.content.filter(
            (user: PageUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.pageUserId === user.pageUserId
                ) &&
                !memberRemoveList.some(
                  (removeUser) => removeUser.pageUserId === user.pageUserId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = searchResultList.filter((user: PageUserType) => {
            return (
              !roleChangeList.some(
                (changeUser) => changeUser.pageUserId === user.pageUserId
              ) &&
              !memberRemoveList.some(
                (removeUser) => removeUser.pageUserId === user.pageUserId
              )
            );
          });
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (userPage === -1) {
          setUserPage(0);
          setIsLoaded(false);
        }
      } catch {}
    }
  };
  const [userRoleMap, setUserRoleMap] = useState<{ [key: number]: string }>({});
  const [memberRemoveIdList, setMemberRemoveIdList] = useState<Array<number>>(
    []
  );

  const tempChangeCurrentPage = (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => {
    if (buttonText === "변경") {
      const keyId = userId;
      const target: { [key: number]: string } = {};
      target[keyId] = role;
      setUserRoleMap((userRoleMap) => ({ ...userRoleMap, ...target }));
      setCurrentChangeRole(role);
      const targetOb = searchResultList.find(
        (member) => member.pageUserId === userId
      );
      if (targetOb !== undefined) {
        setRoleChangeList((prev) => {
          return [...prev, targetOb];
        });
        setTabValue(0);
      }
    } else if (buttonText === "취소") {
      let copyUserRoleMap = { ...userRoleMap };
      delete copyUserRoleMap[userId];
      setUserRoleMap({ ...copyUserRoleMap });
      setRoleChangeList((prev) =>
        prev.filter((user) => user.pageUserId !== userId)
      );
    } else if (buttonText === "삭제") {
      setMemberRemoveIdList((prev) => {
        return [...prev, userId];
      });
      const targetOb = searchResultList.find(
        (member) => member.pageUserId === userId
      );
      if (targetOb !== undefined) {
        setMemberRemoveList((prev) => {
          return [...prev, targetOb];
        });
        setTabValue(1);
      }
    } else if (buttonText === "복구") {
      setMemberRemoveIdList((prev) => prev.filter((id) => id !== userId));
      setMemberRemoveList((prev) =>
        prev.filter((user) => user.pageUserId !== userId)
      );
    }
  };

  const submitPageRoleChange = async () => {
    const body = { pageId: pageId, userRoleMapList: userRoleMap };
    try {
      const { data } = await axios.put(PAGE_USER_API.LIST, body, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setUserRoleMap({});
      setSearchResultList([]);
      setRoleChangeList([]);
      setUserPage(-1);
      setIsSearchLast(false);
    } catch {}
  };

  const submitRemovePageMember = async () => {
    try {
      const body = { pageId: pageId, pageUserIdList: memberRemoveIdList };
      const { data } = await axios.delete(PAGE_USER_API.DELETE, {
        data: body,
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setMemberRemoveIdList([]);
      setSearchResultList([]);
      setMemberRemoveList([]);
      setUserPage(-1);
      setIsSearchLast(false);
    } catch (error) {}
  };

  return teamId !== -1 ? (
    <TeamMemberManageContainer>
      <MemberListContainer>
        <MemberLabelContainer>
          <Label style={{ marginRight: 10 }}>멤버 관리</Label>
        </MemberLabelContainer>
        <SearchBarTab
          category={nameCategory}
          setCategory={setNameCategory}
          MenuItems={searchMenues}
          handleSearchInput={handleSearchInput}
          fetchResultList={fetchResultList}
        ></SearchBarTab>
        {searchResultList.length === 0 ? (
          <></>
        ) : (
          <ResultContainer>
            {searchResultList.map((member, idx) => (
              <SearchPageRole
                role={pageRole}
                key={idx}
                member={member}
                MenuItems={pageRoleMenues}
                buttonFunction={tempChangeCurrentPage}
              ></SearchPageRole>
            ))}
            {searchResultList.length !== 0 && isLoaded && (
              <div className={`${userPage}페이지`}>
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
                buttonFunction={tempChangeCurrentPage}
              ></RoleMemberAdd>
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {memberRemoveList.map((member, idx) => (
              <DelMemberAdd
                key={idx}
                member={member}
                buttonFunction={tempChangeCurrentPage}
              ></DelMemberAdd>
            ))}
          </TabPanel>
        </Box>
        <ButtonContainer>
          <Button
            width="45%"
            borderRadius="10px"
            onClick={submitPageRoleChange}
            style={{ marginLeft: "10px" }}
          >
            권한 변경
          </Button>
          <Button
            width="45%"
            borderRadius="10px"
            background="#C74E4E"
            onClick={submitRemovePageMember}
          >
            내보내기
          </Button>
        </ButtonContainer>
      </MemberListContainer>
    </TeamMemberManageContainer>
  ) : (
    <></>
  );
}
