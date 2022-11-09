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

const InputConainer = styled.input`
  border: 1px solid var(--light-gray-color);
  border-radius: 2px;
  outline: none;
  font-weight: 500;
  font-size: 13px;
  padding: 0 5px;
  :focus {
    border-color: var(--main-color);
  }
`;

type DatePickerProps = {
  style?: React.CSSProperties;
  header?: string;
  userInput?: InputType;
  setUserInput?: Dispatch<SetStateAction<InputType>>;
};

const DatePicker = ({
  header,
  userInput,
  setUserInput,
  ...props
}: DatePickerProps) => {
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
      <InputConainer onChange={(e) => handleChange(e)} {...props} />
    </Container>
  );
};

export default DatePicker;
