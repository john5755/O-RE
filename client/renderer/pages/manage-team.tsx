import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import { BASIC_PHOTO_URL, PATH, TEAM_API } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import TeamDropDown from "../molecule/TeamDropdown";
import { TeamUserType } from "../types";
import SearchResults from "../molecule/SearchResults";
import axios from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { delTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";

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

const TitleContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 15px 0;
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

const SearchContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const SearchCategoryInputContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  border-width: 0 0 1px 0;
  width: 85%;
  height: 90%;
  font-size: 20px;
  ::placeholder {
    text-align: center;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;

const testTeamMembers = [
  {
    userId: 0,
    name: "박싸피",
    email: "",
    nickName: "프론트천재",
    role: "LEADER",
    profileImg: "images/logo.png",
  },
  {
    userId: 1,
    name: "치싸피",
    email: "",
    nickName: "11번가",
    role: "MANAGER",
    profileImg: BASIC_PHOTO_URL,
  },
  {
    userId: 2,
    name: "홍길동",
    email: "",
    nickName: "홍길동",
    role: "USER",
    profileImg: BASIC_PHOTO_URL,
  },
  {
    userId: 3,
    name: "맘모쓰",
    email: "",
    nickName: "900원",
    role: "USER",
    profileImg: BASIC_PHOTO_URL,
  },
  {
    userId: 3,
    name: "맘모쓰",
    email: "",
    nickName: "900원",
    role: "USER",
    profileImg: BASIC_PHOTO_URL,
  },
  {
    userId: 3,
    name: "맘모쓰",
    email: "",
    nickName: "900원",
    role: "USER",
    profileImg: BASIC_PHOTO_URL,
  },
];

export default function ManageTeam() {
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const teamIdx = useAppSelector((state) => state.myTeamsState).selectTeamState
    .idx;

  const dispatch = useAppDispatch();
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    teamList[teamIdx].imageUrl
  );
  // nickname 변경
  const [teamName, setTeamName] = useState<string>(teamList[teamIdx].name);
  //  const HOST = localStorage.getItem();

  function handleTeamNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }

  // role dropdown
  const [role, setRole] = useState<string>("");
  // serach dropdown
  const searchMenues = { name: "이름", nickName: "닉네임" };
  // //team member
  const [searchMemberCategory, setSearchMemberCategory] =
    useState<string>("name");
  // //all member
  const [searchAddCategory, setSearchAddCategory] = useState<string>("name");
  // searchInput
  // // team member
  const [searchTeamInput, setSearchTeamInput] = useState<string>("");
  const handleTeamSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTeamInput(event.target.value);
  };
  const [searchTeamResultList, setSearchTeamResultList] =
    useState<Array<TeamUserType>>(testTeamMembers);
  const fetchTeamResultList = () => {
    setSearchTeamResultList(testTeamMembers);
  };
  // // all member
  const [searchAllInput, setSearchAllInput] = useState<string>("");
  const handleAllSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAllInput(event.target.value);
  };
  const [searchAllResultList, setSearchAllResultList] = useState<
    Array<TeamUserType>
  >([]);
  const fetchAllResultList = () => {
    setSearchAllResultList(testTeamMembers);
  };

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
          <TitleContainer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <H3 style={{ fontWeight: 550 }}>멤버 관리</H3>
            <Button width="120px" height="30px">
              초대링크복사
            </Button>
          </TitleContainer>
          <MemberListContainer>
            <MemberLabelContainer>
              <Label style={{ marginRight: 10 }}>멤버 목록</Label>
            </MemberLabelContainer>
            <SearchContainer>
              <SearchCategoryInputContainer>
                <TeamDropDown
                  category={searchMemberCategory}
                  setCategory={setSearchMemberCategory}
                  MenuItems={searchMenues}
                ></TeamDropDown>
                <SearchInput onChange={handleTeamSearchInput}></SearchInput>
              </SearchCategoryInputContainer>
              <Button width="60px" height="40px" onClick={fetchTeamResultList}>
                검색
              </Button>
            </SearchContainer>
            <SearchResults
              ResultList={searchTeamResultList}
              textButtonColor="#C74E4E"
              textButtonText="삭제"
              needDropdown={true}
              category={role}
              setCategory={setRole}
            ></SearchResults>
            <MemberLabelContainer>
              <Label>멤버 추가</Label>
            </MemberLabelContainer>
            <SearchContainer>
              <SearchCategoryInputContainer>
                <TeamDropDown
                  category={searchAddCategory}
                  setCategory={setSearchAddCategory}
                  MenuItems={searchMenues}
                ></TeamDropDown>
                <SearchInput onChange={handleAllSearchInput}></SearchInput>
              </SearchCategoryInputContainer>
              <Button width="60px" height="40px" onClick={fetchAllResultList}>
                검색
              </Button>
            </SearchContainer>
            <SearchResults
              ResultList={searchAllResultList}
              textButtonColor="#4F68A6"
              textButtonText="추가"
              needDropdown={false}
            ></SearchResults>
          </MemberListContainer>
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
