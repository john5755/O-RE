import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../styles";
import { TagType } from "../types";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
  text-align: center;
  align-items: center;
`;

type CustomType = {
  obj: TagType[];
  setObj: Dispatch<SetStateAction<TagType[]>>;
  objIdx: number;
};

const CustomContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: auto;
`;

const Label = styled.div`
  font-weight: 500;
  text-align: start;
  padding: 5px 0;
`;

const Input = styled.input`
  border: 1px solid var(--light-gray-color);
  height: 30px;
  :focus-visible {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CustomText = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <Label>텍스트 내용</Label>
      <Input
        type="text"
        value={obj[objIdx].tagProps.header}
        onChange={(e) =>
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
          })
        }
      />
    </CustomContainer>
  );
};

const CustomInput = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <Label>라벨</Label>
      <Input
        type="text"
        value={obj[objIdx].tagProps.header}
        onChange={(e) =>
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
          })
        }
      />
    </CustomContainer>
  );
};

const CustomDatePicker = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <Label>라벨</Label>
      <Input
        type="text"
        value={obj[objIdx].tagProps.header}
        onChange={(e) =>
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
          })
        }
      />
    </CustomContainer>
  );
};

const CustomCheckBox = ({ obj, setObj, objIdx }: CustomType) => {
  const [labelCnt, setLabelCnt] = useState<number>(
    obj[objIdx].tagProps.label?.length as number
  );
  return (
    <CustomContainer>
      <Label>라벨</Label>
      <Input
        type="text"
        value={obj[objIdx].tagProps.header}
        onChange={(e) =>
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
          })
        }
      />
      <ButtonContainer>
        <Label>옵션</Label>
        <Button
          width="40px"
          height="20px"
          fontSize="10px"
          borderRadius="5px"
          onClick={() => setLabelCnt((pre) => (pre = pre + 1))}
        >
          추가
        </Button>
        <Button
          width="40px"
          height="20px"
          fontSize="10px"
          borderRadius="5px"
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
          삭제
        </Button>
      </ButtonContainer>
      {labelCnt > 0 &&
        [...Array(labelCnt)].map((_, idx) => {
          return (
            <React.Fragment key={idx}>
              <Label>option {idx}</Label>
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
            </React.Fragment>
          );
        })}
    </CustomContainer>
  );
};

const CustomRadioButton = ({ obj, setObj, objIdx }: CustomType) => {
  const [labelCnt, setLabelCnt] = useState<number>(
    obj[objIdx].tagProps.label?.length as number
  );
  return (
    <CustomContainer>
      <Label>라벨</Label>
      <Input
        type="text"
        value={obj[objIdx].tagProps.header}
        onChange={(e) =>
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
          })
        }
      />
      <ButtonContainer>
        <Label>옵션</Label>
        <Button
          width="40px"
          height="20px"
          fontSize="10px"
          borderRadius="5px"
          onClick={() => setLabelCnt((pre) => (pre = pre + 1))}
        >
          추가
        </Button>
        <Button
          width="40px"
          height="20px"
          fontSize="10px"
          borderRadius="5px"
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
          삭제
        </Button>
      </ButtonContainer>
      {labelCnt > 0 &&
        [...Array(labelCnt)].map((_, idx) => {
          return (
            <React.Fragment key={idx}>
              <Label>option {idx}</Label>
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
            </React.Fragment>
          );
        })}
    </CustomContainer>
  );
};

const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: CustomText,
  // list: List,
  "date picker": CustomDatePicker,
  input: CustomInput,
  // "file upload": FileUpload,
  // table: Table,
  "check box": CustomCheckBox,
  "radio button": CustomRadioButton,
  // "drop down": DropDown,
  // "text area": TextArea,
  // hyperlink: HyperLink,
  // button: ButtonComponent,
};

interface CustomTagProps {
  setIsCustom: (v: number) => void;
  setPageTagList: Dispatch<SetStateAction<TagType[]>>;
  isCustom: number;
  pageTagList: TagType[];
}

export default function CustomTag(props: CustomTagProps) {
  const [tmpPageTagList, setPageTagList] = useState<TagType[]>([
    ...props.pageTagList,
  ]);

  useEffect(() => {
    setPageTagList([...props.pageTagList]);
  }, [props.pageTagList, props.isCustom]);
  if (props.pageTagList[props.isCustom] === undefined) return null;
  const CustomComponent = Component[props.pageTagList[props.isCustom].type];

  return (
    <Container>
      {props.isCustom !== -1 && (
        <CustomComponent
          obj={tmpPageTagList}
          setObj={setPageTagList}
          objIdx={props.isCustom}
        ></CustomComponent>
      )}
      <Button
        width="80%"
        height="30px"
        background="var(--light-main-color)"
        borderRadius="5px"
        onClick={() => {
          props.setIsCustom(-1);
          props.setPageTagList([...tmpPageTagList]);
        }}
        style={{ margin: "0 auto" }}
      >
        수정 완료
      </Button>
    </Container>
  );
}
