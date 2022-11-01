import styled from "@emotion/styled";
import React from "react";
import { Button } from "../styles";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
`;

interface CustomTagProps {
  setIsCustom: (v: boolean) => void;
}

export default function CustomTag(props: CustomTagProps) {
  return (
    <Container>
      <Button
        width="80%"
        height="30px"
        onClick={() => props.setIsCustom(false)}
      >
        수정 완료
      </Button>
    </Container>
  );
}
