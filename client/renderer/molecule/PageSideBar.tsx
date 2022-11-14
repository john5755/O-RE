import styled from "@emotion/styled";
import axios from "../utils/axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { PAGE_USER_API, PATH } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setPageState, setSelectPageState } from "../slices/pageSlice";
import { Button } from "../styles";
import { setNavName } from "../slices/navNameSlice";
import { useClickOther, useClickPage } from "../hooks/resetPageHook";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--super-light-main-color);
`;

const DotButton = styled.button`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 80%;
  border: solid 1px var(--main-color);
  border-style: dashed;
  border-radius: 4px;
  background-color: transparent;
  color: var(--main-color);
  cursor: pointer;

  :hover {
    background-color: var(--light-main-color);
    color: white;
    border-style: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  height: 30px;
  margin: 0 auto;
  margin: 3px auto;
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-size: var(--font-size-200);
  :hover {
    background-color: var(--light-main-color);
    cursor: pointer;
    color: white;
  }
`;

export default function PageSideBar() {
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const pageList = useAppSelector((state) => state.pageState).pageState;
  const dispatch = useAppDispatch();
  const clickPage = useClickPage();
  const clickOther = useClickOther();

  const getPageList = async () => {
    try {
      const params = {
        page: 0,
        size: 100,
      };
      const { data } = await axios.get(
        `${PAGE_USER_API.ALL}/${selectTeam.teamId}`,
        {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(selectTeam);
      console.log(data);
      dispatch(setPageState(data.data.content));
      dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectTeam.idx === -1) return;
    getPageList();
  }, [selectTeam.idx, teamList]);

  const handleClickPage = (idx: number, pageId: number, pageName: string) => {
    dispatch(setSelectPageState({ idx, pageId }));
    dispatch(setNavName(pageName));
    clickPage();
  };

  return (
    <Container>
      {pageList.length > 0 &&
        pageList.map((v, idx) => (
          <ButtonContainer key={v.pageId}>
            <Link href={PATH.VIEW_PAGE}>
              <PageContainer
                onClick={() => handleClickPage(idx, v.pageId, v.name)}
              >
                {v.name}
              </PageContainer>
            </Link>
          </ButtonContainer>
        ))}
      <Link href={PATH.CREATE_PAGE}>
        <DotButton
          onClick={() => {
            clickOther();
            dispatch(setNavName("페이지 생성"));
          }}
        >
          +
        </DotButton>
      </Link>
    </Container>
  );
}
