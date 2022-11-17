import styled from "@emotion/styled";
import React, { useState } from "react";
import InputWithLabel from "../../molecule/TagCustomComponent/InputWithLabel";
import ListOption from "../../molecule/TagCustomComponent/ListOption";
import { CustomType, TagType } from "../../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  margin-bottom: 10px;
`;

export default function CustomCheckBox({ obj, setObj, objIdx }: CustomType) {
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
    <Container>
      <CustomContainer>
        <InputWithLabel
          text="라벨"
          value={obj[objIdx].tagProps.header}
          handleChange={handleChange}
        />
      </CustomContainer>
      <CustomContainer>
        <ListOption obj={obj} setObj={setObj} objIdx={objIdx} />
      </CustomContainer>
    </Container>
  );
}
