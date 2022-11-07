import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { InputType } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  padding-bottom: 10px;
`;

type RadioButtonProps = {
  header?: string;
  label?: string[];
  style?: React.CSSProperties;
  userInput?: InputType;
  setUserInput?: Dispatch<SetStateAction<InputType>>;
};

const RadioButton = ({
  header,
  label,
  userInput,
  setUserInput,
  ...props
}: RadioButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInput![header!]) {
      setUserInput!((pre: any) => {
        return { ...pre, [header!]: "" };
      });
    }
    setUserInput!((pre: any) => {
      return { ...pre, [header!]: e.target.value };
    });
  };

  return (
    <Container>
      {header !== "" && <HeaderContainer>{header}</HeaderContainer>}

      {label?.map((v, i) => (
        <div key={v} style={{ display: "flex", textAlign: "center" }}>
          <input value={v} {...props} onChange={(e) => handleChange(e)} />
          <label>{v}</label>
        </div>
      ))}
    </Container>
  );
};

export default RadioButton;
