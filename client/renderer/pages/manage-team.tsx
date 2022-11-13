import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import {
  BASIC_PHOTO_URL,
  PATH,
  TEAM_API,
  TEAM_USER_API,
  USERS_API,
} from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import { TeamUserType } from "../types";
import SearchBarTab from "../molecule/SearchBarTab";
import axios from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { delTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";
import SearchItemRole from "../molecule/SerachItemRole";
import SearchItemAdd from "../molecule/SearchItemAdd";

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
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const dispatch = useAppDispatch();
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    teamList[teamIdx]?.imageUrl
  );
  // nickname 변경
  const [teamName, setTeamName] = useState<string>(teamList[teamIdx]?.name);
  function handleTeamNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }
  // //team member
  const [nameCategoryMember, setNameCategoryMember] = useState<string>("name");
  const [searchTeamInput, setSearchTeamInput] = useState<string>("");
  const [teamMemberPage, setTeamMemberPage] = useState<number>(0);
  const handleTeamSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTeamInput(event.target.value);
  };
  const [searchTeamResultList, setSearchTeamResultList] = useState<
    Array<TeamUserType>
  >([]);
  const fetchTeamResultList = async () => {
    setSearchTeamResultList([]);
    if (searchTeamInput === "") {
      const params = {
        teamId: teamId,
        page: teamMemberPage,
        size: 20,
      };
      try {
        const { data } = await axios.get(TEAM_USER_API.USERLIST, {
          params,
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        setSearchTeamResultList(data.data.content);
      } catch (error) {}
    } else if (nameCategoryMember === "name") {
      try {
        const params = {
          teamId: teamId,
          name: searchTeamInput,
          page: teamMemberPage,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setSearchTeamResultList(data.data.content);
      } catch {}
    } else if (nameCategoryMember === "nickName") {
      try {
        const params = {
          teamId: teamId,
          nickName: searchTeamInput,
          page: teamMemberPage,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setSearchTeamResultList(data.data.content);
      } catch {}
    }
  };
  const [textButtonColorRole, setTextButtonColorRole] =
    useState<string>("#4F68A6");
  const [textButtontextRole, setTextButtontextRole] = useState<string>("변경");
  const [roleChangeList, setRoleChangeList] = useState<
    Array<{ userId: number; role: string }>
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
        return [...prev, { userId: userId, role: role }];
      });
    } else if (buttonText === "취소") {
      setRoleChangeList((prev) =>
        prev.filter((user) => user.userId !== userId)
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
      const { data } = await axios.patch(`${TEAM_USER_API.INVITE}/${teamId}`, roleChangeList, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setRoleChangeList([]);
      fetchTeamResultList();
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
      fetchTeamResultList();
    } catch (error) {
      console.log(error);
    }
  };

  // member 추가
  const [nameCategoryAll, setNameCategoryAll] = useState<string>("name");
  const [searchAllUserInput, setSearchAllUserInput] = useState<string>("");
  const handleAllSearchUserInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchAllUserInput(event.target.value);
  };
  const [searchAllUserResultList, setSearchAllUserResultList] = useState<
    Array<TeamUserType>
  >([]);
  const [textButtonColorAdd, setTextButtonColorAdd] =
    useState<string>("#4F68A6");
  const [textButtontextAdd, setTextButtontextAdd] = useState<string>("추가");
  const [addMemberList, setAddMemberList] = useState<Array<number>>([]);
  const [allMemberPage, setAllMemberPage] = useState<number>(0);

  const fetchAllUserResultList = async () => {
    setSearchAllUserResultList([]);
    if (searchAllUserInput === "") {
      try {
        const { data } = await axios.get(`${USERS_API.LIST}/${teamId}`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        setSearchAllUserResultList(data.data.content);
      } catch (e) {}
    } else if (nameCategoryAll === "name") {
      try {
        const params = {
          keyword: searchAllUserInput,
          page: allMemberPage,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.NAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setSearchAllUserResultList(data.data.content);
      } catch {}
    } else if (nameCategoryAll === "nickName") {
      try {
        const params = {
          keyword: searchAllUserInput,
          page: allMemberPage,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setSearchAllUserResultList(data.data.content);
      } catch {}
    }
  };

  const tempAddTeamMember = (
    e: React.MouseEvent,
    buttonText: string,
    id: number
  ): void => {
    if (buttonText === "추가") {
      setAddMemberList((prev) => {
        return [...prev, id];
      });
    } else {
      setAddMemberList((prev) => prev.filter((id) => id !== id));
    }
  };

  const submitTeamMember = async () => {
    try {
      const body = { teamId: teamId, userIdList: addMemberList };
      console.log(body);
      const { data } = await axios.post(TEAM_USER_API.INVITE, body, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setAddMemberList([]);
      fetchAllUserResultList();
    } catch (error) {
      console.log(error);
    }
  };



  // 팀 삭제
  const deleteTeam = async () => {
    try {
      await axios.delete(`${TEAM_API.DELETE}/${teamList[teamIdx].teamId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      dispatch(delTeamState(teamList[teamIdx]));
    } catch (e) {}
  };

  return (
    <LayoutContainer>
      <Container>
        <TeamProfileContainer>
          <ProfilePhotos
            photo={photo}
            setPhoto={setPhoto}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
          ></ProfilePhotos>
          <NameContainer>
            <Label htmlFor="teamNameInput">팀 이름</Label>
            <Input
              id="teamNameInput"
              name="teamname"
              height="50px"
              onChange={handleTeamNameInput}
              style={{ margin: "10px auto" }}
            ></Input>
          </NameContainer>
        </TeamProfileContainer>
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
                    buttonText={textButtontextRole}
                    buttonColor={textButtonColorRole}
                    buttonFunction={tempChangeCurrentTeam}
                  ></SearchItemRole>
                ))}
              </ResultContainer>
            )}
            <ButtonContainer>
              <Button width="45%" borderRadius="10px" onClick={submitTeamRoleChange}>
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
          <MemberLabelContainer>
            <Label>멤버 추가</Label>
          </MemberLabelContainer>
          <SearchBarTab
            category={nameCategoryAll}
            setCategory={setNameCategoryAll}
            MenuItems={searchMenues}
            handleSearchInput={handleAllSearchUserInput}
            fetchResultList={fetchAllUserResultList}
          ></SearchBarTab>
          {searchAllUserResultList.length === 0 ? (
            <></>
          ) : (
            <ResultContainer>
              {searchAllUserResultList.map((member, idx) => (
                <SearchItemAdd
                  key={idx}
                  member={member}
                  buttonText={textButtontextAdd}
                  buttonColor={textButtonColorAdd}
                  buttonFunction={tempAddTeamMember}
                ></SearchItemAdd>
              ))}
            </ResultContainer>
          )}
          <ButtonContainer>
            <Button borderRadius="10px" onClick={submitTeamMember}>
              저장
            </Button>
          </ButtonContainer>
        </TeamMemberManageContainer>
        <Button
          background="red"
          width="60px"
          height="40px"
          onClick={() => {
            deleteTeam();
            Router.push(PATH.VIEW_PAGE);
          }}
        >
          삭제
        </Button>
      </Container>
    </LayoutContainer>
  );
}
