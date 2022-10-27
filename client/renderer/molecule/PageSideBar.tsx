import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import EditList from "../components/EditList";
import TagList from "../components/TagList";
import { PATH } from "../constants";
import { pageInfo } from "../hooks/pageHook";
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
  const { pathname } = useRouter();
  const listState = useAppSelector((state) => state.listState).listState;

  return (
    <Container>
      {pageInfo.creatPage.has(pathname) ? (
        <>{listState ? <TagList></TagList> : <EditList></EditList>}</>
      ) : (
        <Link href={PATH.CREATE_PAGE}>
          <Button>+</Button>
        </Link>
      )}
    </Container>
  );
}
