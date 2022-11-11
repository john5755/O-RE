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
  height: 25px;
  width: 90%;
  border: solid 1px var(--main-color);
  border-style: dashed;
  border-radius: 4px;
  background-color: transparent;
  color: var(--main-color);
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
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
              <Button
                onClick={() => handleClickPage(idx, v.pageId, v.name)}
                width="100%"
                borderRadius="5px"
                height="30px"
              >
                {v.name}
              </Button>
            </Link>
          </ButtonContainer>
        ))}
      <Link href={PATH.CREATE_PAGE}>
        <DotButton onClick={clickOther}>+</DotButton>
      </Link>
    </Container>
  );
}
