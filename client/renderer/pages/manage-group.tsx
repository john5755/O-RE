import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, Label, Button, Input } from "../styles";
import { BASIC_PHOTO_URL } from "../constants";
import ProfilePhotos from "../molecule/ProfilePhotos";
import GroupDropDown from "../molecule/GroupDropdown";
import { GroupUserType } from "../types";
import SearchResults from "../molecule/SearchResults";

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

const GroupProfileContainer = styled.div`
  width: 100%;
`;

const GroupMemberManageContainer = styled.div`
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

const testGroupMembers = [
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

export default function ManageGroup() {
  // profile 사진 설정
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(
    BASIC_PHOTO_URL
  );
  // nickname 변경
  const [groupName, setGroupName] = useState<string>("");

  function handleGroupNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(event.target.value);
  }

  // role dropdown
  const [role, setRole] = useState<string>("");
  // serach dropdown
  const searchMenues = { name: "이름", nickName: "닉네임" };
  // //group member
  const [searchMemberCategory, setSearchMemberCategory] =
    useState<string>("name");
  // //all member
  const [searchAddCategory, setSearchAddCategory] = useState<string>("name");
  // searchInput
  // // group member
  const [searchGroupInput, setSearchGroupInput] = useState<string>("");
  const handleGroupSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchGroupInput(event.target.value);
  };
  const [searchGroupResultList, setSearchGroupResultList] =
    useState<Array<GroupUserType>>(testGroupMembers);
  const fetchGroupResultList = () => {
    setSearchGroupResultList(testGroupMembers);
  };
  // // all member
  const [searchAllInput, setSearchAllInput] = useState<string>("");
  const handleAllSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAllInput(event.target.value);
  };
  const [searchAllResultList, setSearchAllResultList] = useState<
    Array<GroupUserType>
  >([]);
  const fetchAllResultList = () => {
    setSearchAllResultList(testGroupMembers);
  };

  return (
    <LayoutContainer>
      <Container>
        <GroupProfileContainer>
          <TitleContainer>
            <H2 style={{ fontWeight: "bold" }}>팀 관리</H2>
          </TitleContainer>
          <ProfilePhotos
            photo={photo}
            setPhoto={setPhoto}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
          ></ProfilePhotos>
          <NameContainer>
            <Label htmlFor="groupNameInput">팀 이름</Label>
            <Input
              id="groupNameInput"
              name="groupname"
              height="50px"
              onChange={handleGroupNameInput}
              style={{ margin: "10px auto" }}
            ></Input>
          </NameContainer>
        </GroupProfileContainer>
        <GroupMemberManageContainer>
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
                <GroupDropDown
                  category={searchMemberCategory}
                  setCategory={setSearchMemberCategory}
                  MenuItems={searchMenues}
                ></GroupDropDown>
                <SearchInput onChange={handleGroupSearchInput}></SearchInput>
              </SearchCategoryInputContainer>
              <Button width="60px" height="40px" onClick={fetchGroupResultList}>
                검색
              </Button>
            </SearchContainer>
            <SearchResults
              ResultList={searchGroupResultList}
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
                <GroupDropDown
                  category={searchAddCategory}
                  setCategory={setSearchAddCategory}
                  MenuItems={searchMenues}
                ></GroupDropDown>
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
        </GroupMemberManageContainer>
      </Container>
    </LayoutContainer>
  );
}
