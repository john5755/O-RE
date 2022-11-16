import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { TEAM_USER_API } from "../constants";
import { TeamUserType } from "../types";
import SearchBarTab from "../molecule/SearchBarTab";
import axios from "../utils/axios";
import { useAppSelector } from "../hooks/reduxHook";
import SearchItemRole from "../molecule/SerachItemRole";

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
  OWNER: "오너",
  LEADER: "리더",
  MANAGER: "관리자",
  MEMBER: "사용자",
};
const pageRoleMenues = {
  OWNER: "오너",
  MAINTAINER: "MAINTAINER",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
};

export default function PageMemberRole() {
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const [nameCategory, setNameCategory] = useState<string>("name");
  const [searchInput, setSearchInput] = useState<string>("");
  const [userPage, setUserPage] = useState<number>(-1);
  const [io, setio] = useState<IntersectionObserver | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isSearchLast, setIsSearchLast] = useState<boolean>(false);
  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (userPage !== -1) {
      setIsSearchLast(false);
      setUserPage(-1);
    }
    setSearchInput(event.target.value);
  };
  const [searchResultList, setSearchResultList] = useState<
    Array<TeamUserType>
  >([]);
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

  const fetchResultList = async () => {
    if (isSearchLast === true || userPage === 0) {
      return;
    }
    if (searchInput === "") {
      const page = userPage === -1 ? 0 : userPage;
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
        if (userPage === -1) {
          setSearchResultList(data.data.content);
        } else {
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
          teamId: teamId,
          name: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (userPage === -1) {
          setSearchResultList(data.data.content);
        } else {
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
          teamId: teamId,
          nickName: searchInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (userPage === -1) {
          setSearchResultList(data.data.content);
        } else {
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
  const [roleChangeList, setRoleChangeList] = useState<
    Array<{ teamUserId: number; role: string }>
  >([]);
  const [memberRemoveList, setMemberRemoveList] = useState<Array<number>>([]);

  const tempChangeCurrentTeam = (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => {
    if (buttonText === "변경") {
      setRoleChangeList((prev) => {
        return [...prev, { teamUserId: userId, role: role }];
      });
    } else if (buttonText === "취소") {
      setRoleChangeList((prev) =>
        prev.filter((user) => user.teamUserId !== userId)
      );
    } else if (buttonText === "삭제") {
      setMemberRemoveList((prev) => {
        return [...prev, userId];
      });
    } else if (buttonText === "복구") {
      setMemberRemoveList((prev) => prev.filter((id) => id !== userId));
    }
  };

  const submitTeamRoleChange = async () => {
    try {
      const { data } = await axios.patch(
        `${TEAM_USER_API.INVITE}/${teamId}`,
        roleChangeList,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );
      setRoleChangeList([]);
      setSearchResultList([]);
      setUserPage(-1);
      setIsSearchLast(false);
    } catch {}
  };

  const submitRemoveTeamMember = async () => {
    try {
      const body = { teamId: teamId, teamUserIdList: memberRemoveList };
      const { data } = await axios.delete(TEAM_USER_API.REMOVE, {
        data: body,
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setMemberRemoveList([]);
      setSearchResultList([]);
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
              <SearchItemRole
                key={idx}
                member={member}
                MenuItems={teamRoleMenues}
                buttonFunction={tempChangeCurrentTeam}
              ></SearchItemRole>
            ))}
            {searchResultList.length !== 0 && isLoaded && (
              <div className={`${userPage}페이지`}>
                검색 결과가 더 없습니다.
              </div>
            )}
          </ResultContainer>
        )}
        <ButtonContainer>
          <Button
            width="45%"
            borderRadius="10px"
            onClick={submitTeamRoleChange}
            style={{ marginLeft: "10px" }}
          >
            변경 저장
          </Button>
          <Button
            width="45%"
            borderRadius="10px"
            background="#C74E4E"
            onClick={submitRemoveTeamMember}
          >
            삭제 저장
          </Button>
        </ButtonContainer>
      </MemberListContainer>
    </TeamMemberManageContainer>
  ) : (
    <></>
  );
}
