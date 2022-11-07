import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PATH } from "../constants";
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
