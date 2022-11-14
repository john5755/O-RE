import styled from "@emotion/styled";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PAGE_API, USER_INPUT_API } from "../constants";
import { useAppSelector } from "../hooks/reduxHook";
import { Button } from "../styles";
import { TagType } from "../types";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
  width: 100%;
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
    input {
      outline: none;
      border: 1px solid var(--main-color);
    }
  }
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
  align-items: center;
`;

const CustomText = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <InputWrapper>
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
      </InputWrapper>
    </CustomContainer>
  );
};

const CustomInput = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <InputWrapper>
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
      </InputWrapper>
    </CustomContainer>
  );
};

const CustomDatePicker = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <CustomContainer>
      <InputWrapper>
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
      </InputWrapper>
    </CustomContainer>
  );
};

const CustomCheckBox = ({ obj, setObj, objIdx }: CustomType) => {
  const [labelCnt, setLabelCnt] = useState<number>(
    obj[objIdx].tagProps.label?.length as number
  );

  return (
    <CustomContainer>
      <InputWrapper>
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
      </InputWrapper>
      <ButtonContainer>
        <Label>옵션</Label>
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
            </InputWrapper>
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
      <InputWrapper>
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
      </InputWrapper>
      <ButtonContainer>
        <Label>옵션</Label>
        <Button
          width="2  0px"
          height="20px"
          fontSize="10px"
          borderRadius="5px"
          onClick={() => setLabelCnt((pre) => (pre = pre + 1))}
        >
          +
        </Button>
        <Button
          width="20px"
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
          -
        </Button>
      </ButtonContainer>
      {labelCnt > 0 &&
        [...Array(labelCnt)].map((_, idx) => {
          return (
            <InputWrapper key={idx}>
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
            </InputWrapper>
          );
        })}
    </CustomContainer>
  );
};

const CustomTable = ({ obj, setObj, objIdx }: CustomType) => {
  type InputPage = { pageId: number; name: string };
  const [pageList, setPageList] = useState<InputPage[]>();
  const [tableInfo, setTableInfo] = useState<any[]>([]);
  const [tableRow, setTableRow] = useState<any[]>([]);
  const [tableIdx, setTableIdx] = useState<number[]>([]);
  const [isList, setIsList] = useState(true);
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const getPageList = async () => {
    try {
      const params = { page: 0, size: 100 };
      const { data } = await axios.get(`${PAGE_API.ALL}${selectTeam.teamId}`, {
        params,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setPageList(data.data.content);
    } catch (e) {}
  };

  useEffect(() => {
    getPageList();
  }, []);

  const getInputList = async (pageId: number) => {
    try {
      const { data } = await axios.get(`${USER_INPUT_API.GET}/${pageId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      console.log(data.data);
      setTableInfo(data.data.inputs);
      setTableRow(Object.keys(data.data.inputs[0]));
    } catch (e) {
      console.log(e);
    }
  };

  const PageListContainer = styled.div`
    min-height: 100%;
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
    background-color: white;
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

  const PageContainer = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    margin: 5px auto;
    align-items: center;
    padding-left: 3px;
    font-size: 14px;
    :hover {
      background-color: var(--light-main-color);
      cursor: pointer;
      color: white;
      border-radius: 2px;
    }
  `;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.target.checked) {
      setTableIdx((pre) => [...pre, idx]);
    } else {
      setTableIdx((pre) => pre.filter((v) => v !== idx));
    }
  };

  const handleSave = () => {
    setObj((pre: any[]) => {
      const row = Object.keys(tableInfo[0]).filter((_, idx) =>
        tableIdx.includes(idx)
      );
      const col = tableInfo.map((v) =>
        Object.values(v).filter((_, idx) => tableIdx.includes(idx))
      );
      return [
        ...pre.slice(0, objIdx),
        {
          ...pre[objIdx],
          tagProps: {
            ...pre[objIdx].tagProps,
            title: [...row],
            data: [...col],
          },
        },
        ...pre.slice(objIdx + 1),
      ];
    });
  };

  useEffect(() => {
    if (tableIdx.length === 0) return;
    handleSave();
  }, [tableIdx]);

  return (
    <CustomContainer>
      <InputWrapper>
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
      </InputWrapper>
      {isList ? (
        <PageListContainer>
          <Label>페이지 리스트</Label>
          {pageList !== undefined &&
            pageList.map((v) => (
              <PageContainer
                key={v.name}
                onClick={() => {
                  getInputList(v.pageId);
                  setIsList(false);
                }}
              >
                {v.name}
              </PageContainer>
            ))}
        </PageListContainer>
      ) : (
        <>
          <Label>Column 선택</Label>
          {tableRow.map((rowName, idx) => (
            <InputContainer key={rowName}>
              <LabelBox id={`${rowName}-${idx}`}>
                <InputBox
                  type="checkbox"
                  value={rowName}
                  id={`${rowName}-${idx}`}
                  onChange={(e) => handleChange(e, idx)}
                  checked={tableIdx.includes(idx)}
                />
                {rowName}
              </LabelBox>
            </InputContainer>
          ))}
        </>
      )}
    </CustomContainer>
  );
};

const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: CustomText,
  "date picker": CustomDatePicker,
  input: CustomInput,
  table: CustomTable,
  "check box": CustomCheckBox,
  "radio button": CustomRadioButton,
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
