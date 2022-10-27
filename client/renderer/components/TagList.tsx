import styled from "@emotion/styled";
import React from "react";
import { TAG_LIST } from "../constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const ItemButton = styled.div`
  width: 80%;
  height: 30px;
  margin: 0 auto;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: var(--light-main-color);
    color: white;
  }
`;

const Item = styled.div`
  padding: 2px 0 0 10px;
`;

export default function TagList() {
  return (
    <Container>
      {TAG_LIST.map((v) => (
        <ItemButton>
          <Item key={v.type}>{v.type}</Item>
        </ItemButton>
      ))}
    </Container>
  );
}
