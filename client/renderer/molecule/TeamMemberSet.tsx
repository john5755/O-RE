import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import { PATH, TEAM_API, TEAM_USER_API, USERS_API } from "../constants";
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

// serach dropdown
const searchMenues = { name: "이름", nickName: "닉네임" };
// result dropdown
const teamRoleMenues = {
  OWNER: "오너",
  LEADER: "리더",
  MANAGER: "관리자",
  MEMBER: "사용자",
};

export default function TeamMemberSet() {
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  // //team member
  const [nameCategoryMember, setNameCategoryMember] = useState<string>("name");
  const [searchTeamInput, setSearchTeamInput] = useState<string>("");
  const [teamMemberPage, setTeamMemberPage] = useState<number>(-1);
  const [teamIo, setTeamIo] = useState<IntersectionObserver | null>(null);
  const [isLoadedTeam, setIsLoadedTeam] = useState<boolean>(true);
  const [isSearchLastTeam, setIsSearchLastTeam] = useState<boolean>(false);
  const handleTeamSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (teamMemberPage !== -1) {
      setIsSearchLastTeam(false);
      setTeamMemberPage(-1);
    }
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
          setSearchTeamResultList(data.data.content);
        } else {
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
          setSearchTeamResultList(data.data.content);
        } else {
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
          setSearchTeamResultList(data.data.content);
        } else {
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
      setSearchTeamResultList([]);
      setTeamMemberPage(-1);
      setIsSearchLastTeam(false);
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
      setSearchTeamResultList([]);
      setTeamMemberPage(-1);
      setIsSearchLastTeam(false);
    } catch (error) {}
  };

  return teamId !== -1 ? (
    <TeamMemberManageContainer>
      <MemberListContainer>
        <MemberLabelContainer>
          <Label style={{ marginRight: 10 }}>멤버 관리</Label>
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
