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

const InputContainer = styled.div`
  display: flex;
  text-align: center;
`;

const InputBox = styled.input`
  cursor: pointer;
  appearance: none;
  border: 1.5px solid var(--light-gray-color);
  border-radius: 0.35rem;
  width: 15px;
  height: 15px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--main-color);
  }
  &:hover {
    background-color: var(--main-color);
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
  }
`;

const LabelBox = styled.label`
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
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

      {label?.map((v, idx) => (
        <InputContainer key={v}>
          <LabelBox id={`${v}-${idx}`}>
            <InputBox
              value={v}
              id={`${v}-${idx}`}
              {...props}
              onChange={(e) => handleChange(e, v)}
            ></InputBox>
            {v}
          </LabelBox>
        </InputContainer>
      ))}
    </Container>
  );
};

export default CheckBox;
