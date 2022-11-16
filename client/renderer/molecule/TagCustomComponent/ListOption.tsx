import styled from "@emotion/styled";
import React, { useState } from "react";
import { CustomType, TagType } from "../../types";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
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

const OptionButon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: var(--light-main-color);
  color: white;
`;

export default function ListOption({ obj, setObj, objIdx }: CustomType) {
  const [labelCnt, setLabelCnt] = useState<number>(
    obj[objIdx].tagProps.label?.length as number
  );

  return (
    <>
      <ButtonContainer>
        <Label>보기</Label>
        <OptionButon onClick={() => setLabelCnt((pre) => (pre = pre + 1))}>
          +
        </OptionButon>
        <OptionButon
          onClick={() => {
            setObj((pre: TagType[]) => {
              return [
                ...pre.slice(0, objIdx),
                {
                  ...pre[objIdx],
                  tagProps: {
                    ...pre[objIdx].tagProps,
                    label: [
                      ...pre[objIdx].tagProps.label!.splice(0, labelCnt - 1),
                    ],
                  },
                },
                ...pre.slice(objIdx + 1),
              ];
            });
            setLabelCnt((pre) => (pre = pre - 1));
          }}
        >
          -
        </OptionButon>
      </ButtonContainer>
      {labelCnt > 0 &&
        [...Array(labelCnt)].map((_, idx) => {
          return (
            <InputWrapper key={idx}>
              <Label>보기{idx + 1}</Label>
              <Input
                type="text"
                value={obj[objIdx].tagProps.label?.[idx]}
                onChange={(e) =>
                  setObj((pre: TagType[]) => {
                    return [
                      ...pre.slice(0, objIdx),
                      {
                        ...pre[objIdx],
                        tagProps: {
                          ...pre[objIdx].tagProps,
                          label: [
                            ...pre[objIdx].tagProps.label!.slice(0, idx),
                            e.target.value,
                            ...pre[objIdx].tagProps.label!.slice(idx + 1),
                          ],
                        },
                      },
                      ...pre.slice(objIdx + 1),
                    ];
                  })
                }
              ></Input>
            </InputWrapper>
          );
        })}
    </>
  );
}
