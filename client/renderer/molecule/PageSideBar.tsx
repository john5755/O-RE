import styled from "@emotion/styled";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { PAGE_USER_API, PATH } from "../constants";
import { useAppSelector } from "../hooks/reduxHook";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: var(--super-light-main-color);
`;

const Button = styled.button`
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

export default function PageSideBar() {
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const HOST = useAppSelector((state) => state.axiosState).axiosState;
  const getPageList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const params = {
        page: 0,
        size: 100,
      };
      const { data } = await axios.get(
        `${HOST}${PAGE_USER_API.ALL}/${selectTeam.teamId}`,
        {
          params,
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectTeam.teamId === -1) return;
    getPageList();
  }, [selectTeam]);

  return (
    <Container>
      <Link href={PATH.VIEW_PAGE}>
        <Button>페이지 바로가기</Button>
      </Link>
      <Link href={PATH.CREATE_PAGE}>
        <Button>+</Button>
      </Link>
    </Container>
  );
}
