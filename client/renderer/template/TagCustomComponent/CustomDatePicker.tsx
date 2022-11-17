import styled from "@emotion/styled";
import React from "react";
import InputWithLabel from "../../molecule/TagCustomComponent/InputWithLabel";
import { CustomType, TagType } from "../../types";

const CustomContainer = styled.div`
  min-height: 100%;
  width: 80%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 0 auto;
  overflow: auto;
  border-radius: 4px;
  background-color: #c1d4d7;
`;

export default function CustomDatePicker({ obj, setObj, objIdx }: CustomType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObj((pre: TagType[]) => {
      return [
        ...pre.slice(0, objIdx),
        {
          ...pre[objIdx],
          tagProps: {
            ...pre[objIdx].tagProps,
            header: e.target.value,
          },
        },
        ...pre.slice(objIdx + 1),
      ];
    });
  };

  return (
    <CustomContainer>
      <InputWithLabel
        text="라벨"
        handleChange={handleChange}
        value={obj[objIdx].tagProps.header}
      />
    </CustomContainer>
  );
}
