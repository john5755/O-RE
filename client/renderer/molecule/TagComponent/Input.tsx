import styled from "@emotion/styled";
import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { InputType } from "../../types";

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
  padding-left: 5px;
  :focus {
    border-color: var(--main-color);
  }
`;

type InputProps = PropsWithChildren<{
  style?: React.CSSProperties;
  header?: string;
  children?: string;
  userInput?: InputType;
  setUserInput?: Dispatch<SetStateAction<InputType>>;
}>;

const Input = ({
  children,
  header,
  userInput,
  setUserInput,
  ...props
}: InputProps) => {
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
      <InputConainer
        {...props}
        onChange={(e) => handleChange(e)}
      ></InputConainer>
    </Container>
  );
};

export default Input;
