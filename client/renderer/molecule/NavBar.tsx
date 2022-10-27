import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px 0px 0px 0px;

  background-color: var(--light-main-color);
`;

export default function NavBar() {
  return <Container>NavBar</Container>;
}
