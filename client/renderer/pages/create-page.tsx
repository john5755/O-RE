import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import PageSideBar from "../molecule/PageSideBar";
import { setListStateTrue, setListStateFalse } from "../slices/listSlices";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  width: 100%;
  height: 100%;
`;
const Container = styled.div``;

export default function CreatePage() {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <PageSideBar />
      <Container>
        <button
          onClick={() => {
            dispatch(setListStateFalse());
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            dispatch(setListStateTrue());
          }}
        >
          수정 완료
        </button>
      </Container>
    </Wrapper>
  );
}
