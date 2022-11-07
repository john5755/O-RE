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
      <input onChange={(e) => handleChange(e)} {...props} />
    </Container>
  );
};

export default DatePicker;
