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

const InputContainer = styled.div`
  display: flex;
  text-align: center;
`;

type CheckBoxProps = {
  header?: string;
  label?: string[];
  style?: React.CSSProperties;
  userInput?: InputType;
  setUserInput?: Dispatch<SetStateAction<InputType>>;
};

const CheckBox = ({
  header,
  label,
  userInput,
  setUserInput,
  ...props
}: CheckBoxProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (!header || !setUserInput || !userInput) return;
    if (!userInput[header]) {
      setUserInput((pre: InputType) => {
        return { ...pre, [header!]: [] };
      });
    }
    if (e.target.checked) {
      setUserInput((pre) => {
        const preArr = pre[header];
        return {
          ...pre,
          [header]: Array.isArray(preArr)
            ? [...preArr, e.target.value]
            : preArr,
        };
      });
    } else {
      setUserInput((pre) => {
        const preArr = pre[header];
        return {
          ...pre,
          [header]: Array.isArray(preArr)
            ? preArr.filter((v: string) => v !== value)
            : preArr,
        };
      });
    }
  };

  return (
    <Container>
      {header !== "" && <HeaderContainer>{header}</HeaderContainer>}

      {label?.map((v) => (
        <InputContainer key={v}>
          <input value={v} {...props} onChange={(e) => handleChange(e, v)} />
          <label>{v}</label>
        </InputContainer>
      ))}
    </Container>
  );
};

export default CheckBox;
