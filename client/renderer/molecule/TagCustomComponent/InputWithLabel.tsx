import styled from "@emotion/styled";
import React from "react";
const Input = styled.input`
  border: 1px solid var(--light-gray-color);
  height: 30px;
  :focus-visible {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;

const Label = styled.div`
  text-align: start;
  padding: 5px 0;
  margin-bottom: 5px;
  font-size: 13px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &:focus-within {
    ${Label} {
      font-weight: 600;
    }
    ${Input} {
      outline: none;
      border: 1px solid var(--main-color);
    }
  }
`;

type InputWithLabel = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function InputWithLabel({ text, value, handleChange }: any) {
  return (
    <InputWrapper>
      <Label>{text}</Label>
      <Input value={value} onChange={(e) => handleChange(e)}></Input>
    </InputWrapper>
  );
}
