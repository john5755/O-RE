import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "../utils/axios";
import { H3, H4, Button } from "../styles";
import { USERS_API } from "../constants";
import SearchBarTab from "./SearchBarTab";
import SearchServerRole from "./SearchServerRole";
import { TeamUserType } from "../types";

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 20px 0;
`;

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

const excelUrl =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/application/ORE.xlsx";

const searchMenues = { name: "이름", nickName: "닉네임" };
const serverRoleMenues = {
  OWNER: "오너",
  ADMIN: "관리자",
  USER: "사용자",
};
export default function ServerRole() {
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
  const [roleChangeList, setRoleChangeList] = useState<
    Array<{ userId: number; role: string }>
  >([]);
  const [removeList, setRemoveList] = useState<Array<number>>([]);
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
          setSearchResultList(data.data.content);
        } else {
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
          setSearchResultList(data.data.content);
        } else {
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
          setSearchResultList(data.data.content);
        } else {
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
      setRoleChangeList((prev) => {
        return [...prev, { userId: userId, role: role }];
      });
    } else if (buttonText === "취소") {
      setRoleChangeList((prev) =>
        prev.filter((user) => user.userId !== userId)
      );
    } else if (buttonText === "삭제") {
      setRemoveList((prev) => {
        return [...prev, userId];
      });
    } else if (buttonText === "복구") {
      setRemoveList((prev) => prev.filter((id) => id !== userId));
    }
  };

  const submitRoleChange = async () => {
    try {
      const { data } = await axios.put(USERS_API.AUTH, roleChangeList, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setRoleChangeList([]);
      setSearchResultList([]);
      setSearchPage(-1);
      setIsSearchLast(false);
    } catch {}
  };

  const submitRemoveMember = async () => {
    try {
      const { data } = await axios.delete(USERS_API.LIST, {
        data: removeList,
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setRemoveList([]);
      setSearchResultList([]);
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
