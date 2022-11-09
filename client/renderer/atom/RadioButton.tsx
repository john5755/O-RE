import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { InputType } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
`;

const InputBox = styled.input`
  cursor: pointer;
  appearance: none;
  border-radius: 50%;
  border: 3px solid rgb(255, 255, 255);
  box-shadow: 0 0 0 1px var(--light-gray-color);
  width: 14px;
  height: 14px;
  &:checked,
  &:hover {
    background-color: var(--main-color);
    box-shadow: 0 0 0 1px var(--main-color);
  }
`;

const InputContainer = styled.div`
  display: flex;
  text-align: center;
  padding-bottom: 7px;
`;

const LabelBox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
`;

const TextBox = styled.div`
  margin-left: 5px;
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
      {label?.map((v, idx) => (
        <InputContainer key={v}>
          <LabelBox id={`${v}-${idx}`}>
            <InputBox
              value={v}
              id={`${v}-${idx}`}
              {...props}
              onChange={(e) => handleChange(e)}
            ></InputBox>
            <TextBox>{v}</TextBox>
          </LabelBox>
        </InputContainer>
      ))}
    </Container>
  );
};

export default RadioButton;
