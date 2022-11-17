import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "../utils/axios";
import { H3, H4, Button } from "../styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { USERS_API } from "../constants";
import SearchBarTab from "./SearchBarTab";
import SearchServerRole from "./SearchServerRole";
import { TeamUserType } from "../types";

const TextContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0 20px 0;
`;

const AddUserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddRoleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DownLoadIconSpan = styled.span`
  vertical-align: middle;
  margin-left: 5px;
`;

const DownLoadLink = styled.a`
  color: gray;
`;

const ExplainContainer = styled.ul`
  list-style-type: decimal;
  padding: 0px;
  > li::before {
    display: inline-block;
    vertical-align: middle;
  }
`;

const ExplainItem = styled.li`
  padding: 10px 0px 5px 5px;
  height: 30px;
  margin-left: 20px;
  margin-bottom: 5px;
  font-size: 15px;
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
export default function ServerOption() {
  const [userExcel, setUserExcel] = useState<File | null>(null);
  const excelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length !== 0) {
      setUserExcel(event.target.files[0]);
    } else {
      return;
    }
  };
  const sendUserExcel = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    if (userExcel !== null) {
      formData.append("file", userExcel);
    }
    try {
      const res = await axios.post(USERS_API.LIST, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: accessToken,
        },
      });
    } catch {}
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
    if (searchPage !== -1) {
      fetchResultList();
    }
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
    <>
      <AddUserContainer>
        <TextContainer>
          <H3 style={{ fontWeight: "bold" }}>회원 추가</H3>
        </TextContainer>
        <H4>회원 추가 가이드</H4>
        <ExplainContainer>
          <ExplainItem>
            엑셀을 다운로드 해주세요.
            <DownLoadIconSpan>
              <DownLoadLink href={excelUrl}>
                <FileDownloadIcon />
              </DownLoadLink>
            </DownLoadIconSpan>
          </ExplainItem>
          <ExplainItem>
            엑셀에 추가할 이메일을 입력하신 후 <strong>파일선택</strong>을 눌러
            업로드 해주세요.
          </ExplainItem>
          <ExplainItem>
            <strong>전송</strong>버튼을 누르시면 회원이 추가 됩니다.
          </ExplainItem>
          <ExplainItem>
            첫 비밀번호는 <strong>이메일ID + 123!</strong> 입니다.
          </ExplainItem>
          <ExplainItem>
            최초 사용자 추가 시 권한은 모두 <strong>사용자</strong>입니다.
          </ExplainItem>
        </ExplainContainer>
        <input type="file" accept=".xlsx" onChange={excelChange}></input>
        <ButtonContainer>
          <Button borderRadius="10px" onClick={sendUserExcel}>
            전송
          </Button>
        </ButtonContainer>
      </AddUserContainer>
      <AddRoleContainer>
        <TextContainer>
          <H3 style={{ fontWeight: "bold" }}>권한 변경</H3>
        </TextContainer>
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
            변경 저장
          </Button>
          <Button
            width="45%"
            borderRadius="10px"
            background="#C74E4E"
            onClick={submitRemoveMember}
            style={{ marginLeft: "10px" }}
          >
            삭제 저장
          </Button>
        </ButtonContainer>
      </AddRoleContainer>
    </>
  );
}
