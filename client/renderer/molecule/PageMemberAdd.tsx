import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Label, Button } from "../styles";
import { PAGE_USER_API, TEAM_USER_API, USERS_API } from "../constants";
import { TeamUserType } from "../types";
import SearchBarTab from "./SearchBarTab";
import axios from "../utils/axios";
import { useAppSelector } from "../hooks/reduxHook";
import SearchTeamAdd from "./SearchTeamAdd";

const TeamMemberManageContainer = styled.div`
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

type PageMemberAdd = {
  pageId: string | string[];
};

export default function PageMemberAdd({ pageId }: PageMemberAdd) {
  const teamId = useAppSelector((state) => state.myTeamsState).selectTeamState
    .teamId;
  const [nameCategoryAll, setNameCategoryAll] = useState<string>("name");
  const [searchAllUserInput, setSearchAllUserInput] = useState<string>("");
  const handleAllSearchUserInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (allMemberPage !== -1) {
      setIsSearchLastAll(false);
      setAllMemberPage(-1);
    }
    setSearchAllUserInput(event.target.value);
  };
  const [searchAllUserResultList, setSearchAllUserResultList] = useState<
    Array<TeamUserType>
  >([]);
  const [addMemberList, setAddMemberList] = useState<Array<number>>([]);
  const [allMemberPage, setAllMemberPage] = useState<number>(-1);
  const [allIo, setAllIo] = useState<IntersectionObserver | null>(null);
  const [isLoadedAll, setIsLoadedAll] = useState<boolean>(true);
  const [isSearchLastAll, setIsSearchLastAll] = useState<boolean>(false);

  const registerObservingElMember = (el: Element) => {
    if (allIo !== null) {
      allIo.observe(el);
    }
  };

  function setScrollTargetAll() {
    const currentTargetClassAll = `${allMemberPage}페이지`;
    const target = document.getElementsByClassName(currentTargetClassAll)[0];
    if (target) {
      registerObservingElMember(target);
    }
  }

  useEffect(() => {
    if (searchAllUserResultList.length > 0) {
      setIsLoadedAll(true);
    }
  }, [searchAllUserResultList.length]);

  useEffect(() => {
    if (isLoadedAll) {
      setScrollTargetAll();
    }
  }, [isLoadedAll]);

  useEffect(() => {
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoadedAll(false);
          setAllMemberPage(allMemberPage + 1);
          if (allIo !== null) {
            allIo.disconnect();
          }
        }
      });
    });
    setAllIo(targetObserver);
    fetchAllUserResultList();
  }, [allMemberPage]);

  const fetchAllUserResultList = async () => {
    if (isSearchLastAll === true || allMemberPage === 0) {
      return;
    }
    if (searchAllUserInput === "") {
      const page = allMemberPage === -1 ? 0 : allMemberPage;
      try {
        const params = {
          pageId: pageId,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.PAGELIST, {
          params,
          headers: { Authorization: localStorage.getItem("accessToken") },
        });
        if (allMemberPage === -1) {
          setSearchAllUserResultList(data.data.content);
        } else {
          setSearchAllUserResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastAll(data.data.last);
        if (allMemberPage === -1) {
          setAllMemberPage(0);
          setIsLoadedAll(false);
        }
      } catch (e) {}
    } else if (nameCategoryAll === "name") {
      const page = allMemberPage === -1 ? 0 : allMemberPage;
      try {
        const params = {
          pageId: pageId,
          name: searchAllUserInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(TEAM_USER_API.PAGENAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (allMemberPage === -1) {
          setSearchAllUserResultList(data.data.content);
        } else {
          setSearchAllUserResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastAll(data.data.last);
        if (allMemberPage === -1) {
          setAllMemberPage(0);
          setIsLoadedAll(false);
        }
      } catch {}
    } else if (nameCategoryAll === "nickName") {
      const page = allMemberPage === -1 ? 0 : allMemberPage;
      try {
        const params = {
          pageId: pageId,
          nickname: searchAllUserInput,
          page: page,
          size: 20,
        };
        const { data } = await axios.get(USERS_API.NICKNAME, {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (allMemberPage === -1) {
          setSearchAllUserResultList(data.data.content);
        } else {
          setSearchAllUserResultList((prev) => {
            return [...prev, ...data.data.content];
          });
        }
        setIsSearchLastAll(data.data.last);
        if (allMemberPage === -1) {
          setAllMemberPage(0);
          setIsLoadedAll(false);
        }
      } catch {}
    }
  };

  const tempAddPageMember = (
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

  const submitPageMember = async () => {
    try {
      const body = { pageId: pageId, pageUserIdList: addMemberList };
      console.log(body);
      const { data } = await axios.post(PAGE_USER_API.LIST, body, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setAddMemberList([]);
      setSearchAllUserResultList([]);
      setAllMemberPage(-1);
      setIsSearchLastAll(false);
    } catch (error) {}
  };

  return teamId !== -1 ? (
    <TeamMemberManageContainer>
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
            <SearchTeamAdd
              key={idx}
              member={member}
              buttonFunction={tempAddPageMember}
            ></SearchTeamAdd>
          ))}
          {searchAllUserResultList.length !== 0 && isLoadedAll && (
            <div className={`${allMemberPage}페이지`}>
              검색 결과가 더 없습니다.
            </div>
          )}
        </ResultContainer>
      )}
      <ButtonContainer>
        <Button borderRadius="10px" onClick={submitPageMember}>
          저장
        </Button>
      </ButtonContainer>
    </TeamMemberManageContainer>
  ) : (
    <></>
  );
}
