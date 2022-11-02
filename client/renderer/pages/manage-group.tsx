import React, { useState } from "react";
import styled from "@emotion/styled";
import { H2, H3, H4, Label, Button, Input } from "../styles";
import { BASIC_PHOTO_URL } from "../constants";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import ProfilePhotos from "../molecule/ProfilePhotos";
import SearchDropDown from "../molecule/SearchDropdown";

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

const CurrentProfile = styled.img`
  width: 40px;
  height: 40px;
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

const ResultItemContainer = styled.div`
  border-bottom: 0.3px solid var(--light-main-color);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberContainer = styled.div`
  width: 98%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const RoleConatiner = styled.div`
  display: flex;
`;

const UnderlineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const SearchNameConatiner = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
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

interface GroupType {
  userId: number;
  name: string;
  email: string;
  nickName: string;
  role: string;
  profileImg?: string;
}

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
  const [groupname, setGroupName] = useState<string>("");

  function handleGroupNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(event.target.value);
  }

  // role dropdown
  const [role, setRole] = useState<string>("");
  const handleChange = (event: SelectChangeEvent, userId: number) => {
    setRole(event.target.value as string);
    groupMembers[userId].role = event.target.value as string;
    console.log(groupMembers[userId].role);
  };

  const [groupMembers, setGroupMembers] =
    useState<Array<GroupType>>(testGroupMembers);

  // serach dropdown
  // //group member
  const [searchMemberCategory, setSearchMemberCategory] =
    useState<string>("name");
  const categoryMemberChange = (event: SelectChangeEvent) => {
    setSearchMemberCategory(event.target.value as string);
  };
  // //all member
  const [searchAddCategory, setSearchAddCategory] = useState<string>("name");
  const categoryAddChange = (event: SelectChangeEvent) => {
    setSearchAddCategory(event.target.value as string);
  };
  // searchInput
  // // group member
  const [searchGroupInput, setSearchGroupInput] = useState<string>("");
  const handleGroupSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchGroupInput(event.target.value);
  };
  const [searchGroupResultList, setSearchGroupResultList] = useState<
    Array<GroupType> | []
  >([]);
  const fetchGroupResultList = () => {
    setSearchGroupResultList(testGroupMembers);
  };
  // // all member
  const [searchAllInput, setSearchAllInput] = useState<string>("");
  const handleAllSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAllInput(event.target.value);
  };
  const [searchAllResultList, setSearchAllResultList] = useState<
    Array<GroupType> | []
  >([]);
  const fetchAllResultList = () => {
    setSearchAllResultList(testGroupMembers);
  };

  return (
    <LayoutContainer>
      <Container>
        <GroupProfileContainer>
          <TitleContainer>
            <H2 style={{ fontWeight: "bold" }}>그룹 관리</H2>
          </TitleContainer>
          <ProfilePhotos
            photo={photo}
            setPhoto={setPhoto}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
          ></ProfilePhotos>
          <NameContainer>
            <Label htmlFor="groupNameInput">그룹 이름</Label>
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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl sx={{ width: 100, height: 38 }}>
                    <Select
                      id="demo-simple-select"
                      value={searchMemberCategory}
                      onChange={categoryMemberChange}
                    >
                      <MenuItem value="name">이름</MenuItem>
                      <MenuItem value="nickName">닉네임</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <SearchInput onChange={handleGroupSearchInput}></SearchInput>
              </SearchCategoryInputContainer>
              <Button width="60px" height="40px" onClick={fetchGroupResultList}>
                검색
              </Button>
            </SearchContainer>
            <ResultContainer>
              {groupMembers.map((member, idx) => (
                <ResultItemContainer key={idx}>
                  <MemberContainer>
                    <SearchNameConatiner>
                      <CurrentProfile src={member.profileImg}></CurrentProfile>
                      <H4 style={{ paddingTop: "4px", marginLeft: "10px" }}>
                        {member.name}({member.nickName})
                      </H4>
                    </SearchNameConatiner>
                    <RoleConatiner>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ width: 100, height: 38 }}>
                          <Select
                            id="demo-simple-select"
                            value={member.role}
                            onChange={(event) => {
                              handleChange(event, member.userId);
                            }}
                          >
                            <MenuItem value="LEADER">리더</MenuItem>
                            <MenuItem value="MANAGER">관리자</MenuItem>
                            <MenuItem value="USER">사용자</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <UnderlineContainer style={{ color: "#C74E4E" }}>
                        삭제
                      </UnderlineContainer>
                    </RoleConatiner>
                  </MemberContainer>
                </ResultItemContainer>
              ))}
            </ResultContainer>
            <MemberLabelContainer>
              <Label>멤버 추가</Label>
            </MemberLabelContainer>
            <SearchContainer>
              <SearchCategoryInputContainer>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl sx={{ width: 100, height: 38 }}>
                    <Select
                      id="demo-simple-select"
                      value={searchAddCategory}
                      onChange={categoryAddChange}
                    >
                      <MenuItem value="name">이름</MenuItem>
                      <MenuItem value="nickName">닉네임</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <SearchInput onChange={handleAllSearchInput}></SearchInput>
              </SearchCategoryInputContainer>
              <Button width="60px" height="40px" onClick={fetchAllResultList}>
                검색
              </Button>
            </SearchContainer>
            <ResultContainer>
              {searchAllResultList.map((member, idx) => (
                <ResultItemContainer key={idx}>
                  <MemberContainer>
                    <SearchNameConatiner>
                      <CurrentProfile src={member.profileImg}></CurrentProfile>
                      <H4 style={{ paddingTop: "4px", marginLeft: "10px" }}>
                        {member.name}({member.nickName})
                      </H4>
                    </SearchNameConatiner>
                    <UnderlineContainer style={{ color: "#4F68A6" }}>
                      추가
                    </UnderlineContainer>
                  </MemberContainer>
                </ResultItemContainer>
              ))}
            </ResultContainer>
          </MemberListContainer>
        </GroupMemberManageContainer>
      </Container>
    </LayoutContainer>
  );
}
