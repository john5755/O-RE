import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "../utils/axios";
import { H3, H4, Button } from "../styles";
import { USERS_API } from "../constants";
import SearchBarTab from "./SearchBarTab";
import SearchServerRole from "./SearchServerRole";
import DelMemberAdd from "./DelMemberAdd";
import { TeamUserType } from "../types";
import { Tab, Tabs, Box } from "@mui/material";
import RoleMemberAdd from "./RoleMemeverAdd";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const AddRoleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 40%;
  height: 40px;
  margin: 20px auto;
`;

const ResultContainer = styled.div`
  height: 220px;
  padding: 5px;
  overflow-y: auto;
`;

const searchMenues = { name: "이름", nickName: "닉네임" };
const serverRoleMenues = {
  OWNER: "오너",
  ADMIN: "관리자",
  USER: "사용자",
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

export default function ServerRole() {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const [nameCategory, setNameCategory] = useState<string>("name");
  const [searchInput, setSearchInput] = useState<string>("");
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const [searchResultList, setSearchResultList] = useState<Array<TeamUserType>>(
    []
  );
  const [searchPage, setSearchPage] = useState<number>(-1);
  const [io, setIo] = useState<IntersectionObserver | null>(null);
  const [isSearchLoaded, setIsSearchLoaded] = useState<boolean>(true);
  const [roleChangeIdList, setRoleChangeIdList] = useState<
    Array<{ userId: number; role: string }>
  >([]);
  const [currentChangeRole, setCurrentChangeRole] = useState<string>("");
  const [roleChangeList, setRoleChangeList] = useState<Array<TeamUserType>>([]);
  const [removeIdList, setRemoveIdList] = useState<Array<number>>([]);
  const [removeList, setRemoveList] = useState<Array<TeamUserType>>([]);
  const [isSearchLast, setIsSearchLast] = useState<boolean>(false);

  const registerObservingEl = (el: Element) => {
    if (io !== null) {
      io.observe(el);
    }
  };

  function setScrollTarget() {
    const currentTargetClass = `${searchPage}페이지`;
    const target = document.getElementsByClassName(currentTargetClass)[0];
    if (target) {
      registerObservingEl(target);
    }
  }
  useEffect(() => {
    if (searchResultList.length > 0) {
      setIsSearchLoaded(true);
    }
  }, [searchResultList.length]);

  useEffect(() => {
    if (isSearchLoaded) {
      setScrollTarget();
    }
  }, [isSearchLoaded]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSearchLoaded(false);
          setSearchPage(searchPage + 1);
          if (io !== null) {
            io.disconnect();
          }
        }
      });
    });
    setIo(targetObserver);
    fetchResultList();
  }, [searchPage]);

  useEffect(() => {
    if (searchInput !== "" || searchPage !== -1) {
      setSearchResultList([]);
      setSearchPage(-1);
      setIsSearchLast(false);
      fetchResultList();
    }
  }, [searchInput]);

  useEffect(() => {
    setIsSearchLast(false);
    if (searchPage === 1) {
      setSearchPage(-1);
    } else {
      setSearchPage(searchPage - 1);
    }
    fetchResultList();
  }, [roleChangeList.length, removeList.length]);

  const fetchResultList = async () => {
    if (isSearchLast === true || searchPage === 0) {
      return;
    }
    if (searchInput === "") {
      const page = searchPage === -1 ? 0 : searchPage;
      try {
        const params = {
          page: page,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.LIST, {
          params,
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        if (searchPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !removeList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = searchResultList.filter((user: TeamUserType) => {
            return (
              !roleChangeList.some(
                (changeUser) => changeUser.userId === user.userId
              ) &&
              !removeList.some(
                (removeUser) => removeUser.userId === user.userId
              )
            );
          });
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (searchPage === -1) {
          setSearchPage(0);
          setIsSearchLoaded(false);
        }
      } catch (e) {}
    } else if (nameCategory === "name") {
      const page = searchPage === -1 ? 0 : searchPage;
      try {
        const params = {
          keyword: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (searchPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !removeList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = searchResultList.filter((user: TeamUserType) => {
            return (
              !roleChangeList.some(
                (changeUser) => changeUser.userId === user.userId
              ) &&
              !removeList.some(
                (removeUser) => removeUser.userId === user.userId
              )
            );
          });
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (searchPage === -1) {
          setSearchPage(0);
          setIsSearchLoaded(false);
        }
      } catch {}
    } else if (nameCategory === "nickName") {
      const page = searchPage === -1 ? 0 : searchPage;
      try {
        const params = {
          keyword: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (searchPage === -1) {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !removeList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchResultList(filteredList);
        } else {
          const filteredList = data.data.content.filter(
            (user: TeamUserType) => {
              return (
                !roleChangeList.some(
                  (changeUser) => changeUser.userId === user.userId
                ) &&
                !removeList.some(
                  (removeUser) => removeUser.userId === user.userId
                )
              );
            }
          );
          setSearchResultList(filteredList);
          setSearchResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLast(data.data.last);
        if (searchPage === -1) {
          setSearchPage(0);
          setIsSearchLoaded(false);
        }
      } catch {}
    }
  };

  const tempChangeUser = (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => {
    if (buttonText === "변경") {
      setRoleChangeIdList((prev) => {
        return [...prev, { userId: userId, role: role }];
      });
      setCurrentChangeRole(role);
      const target = searchResultList.find(
        (member) => member.userId === userId
      );
      if (target !== undefined) {
        setRoleChangeList((prev) => {
          return [...prev, target];
        });
        setTabValue(0);
      }
    } else if (buttonText === "취소") {
      setRoleChangeIdList((prev) =>
        prev.filter((user) => user.userId !== userId)
      );
      setRoleChangeList((prev) =>
        prev.filter((user) => user.userId !== userId)
      );
    } else if (buttonText === "삭제") {
      setRemoveIdList((prev) => {
        return [...prev, userId];
      });
      const target = searchResultList.find(
        (member) => member.userId === userId
      );
      if (target !== undefined) {
        setRemoveList((prev) => {
          return [...prev, target];
        });
        setTabValue(1);
      }
    } else if (buttonText === "복구") {
      setRemoveIdList((prev) => prev.filter((id) => id !== userId));
      setRemoveList((user) => user.filter((user) => user.userId !== userId));
    }
  };

  const submitRoleChange = async () => {
    try {
      const { data } = await axios.put(USERS_API.AUTH, roleChangeIdList, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setRoleChangeIdList([]);
      setSearchResultList([]);
      setRoleChangeList([]);
      setSearchPage(-1);
      setIsSearchLast(false);
    } catch {}
  };

  const submitRemoveMember = async () => {
    try {
      const { data } = await axios.delete(USERS_API.LIST, {
        data: removeIdList,
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setRemoveIdList([]);
      setSearchResultList([]);
      setRemoveList([]);
      setSearchPage(-1);
      setIsSearchLast(false);
    } catch (error) {}
  };

  return (
    <AddRoleContainer>
      <SearchBarTab
        category={nameCategory}
        setCategory={setNameCategory}
        MenuItems={searchMenues}
        handleSearchInput={handleSearchInput}
        fetchResultList={fetchResultList}
      ></SearchBarTab>
      {searchResultList.length !== 0 && (
        <ResultContainer>
          {searchResultList.map((member, idx) => (
            <SearchServerRole
              key={idx}
              member={member}
              MenuItems={serverRoleMenues}
              buttonFunction={tempChangeUser}
            ></SearchServerRole>
          ))}
          {searchResultList.length !== 0 && isSearchLoaded && (
            <div className={`${searchPage}페이지`}>
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
              buttonFunction={tempChangeUser}
            ></RoleMemberAdd>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {removeList.map((member, idx) => (
            <DelMemberAdd
              key={idx}
              member={member}
              buttonFunction={tempChangeUser}
            ></DelMemberAdd>
          ))}
        </TabPanel>
      </Box>
      <ButtonContainer>
        <Button width="45%" borderRadius="10px" onClick={submitRoleChange}>
          권한 변경
        </Button>
        <Button
          width="45%"
          borderRadius="10px"
          background="#C74E4E"
          onClick={submitRemoveMember}
          style={{ marginLeft: "10px" }}
        >
          회원 퇴출
        </Button>
      </ButtonContainer>
    </AddRoleContainer>
  );
}
