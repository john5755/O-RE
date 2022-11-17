import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PAGE_API, USER_INPUT_API } from "../../constants";
import { useAppSelector } from "../../hooks/reduxHook";
import InputWithLabel from "../../molecule/TagCustomComponent/InputWithLabel";
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
  margin: 0 auto 10px auto;
  overflow: auto;
  border-radius: 4px;
  background-color: #c1d4d7;
`;
const Label = styled.div`
  text-align: start;
  padding: 5px 0;
  margin-bottom: 5px;
  font-size: 13px;
`;
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

const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export default function CustomTable({ obj, setObj, objIdx }: CustomType) {
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
      setTableInfo(data.data.inputs);
      setTableRow(Object.keys(data.data.inputs[0]));
    } catch (e) {}
  };

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

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          handleChange={handleLabelChange}
        />
      </CustomContainer>
      <CustomContainer>
        {isList ? (
          <PageListContainer>
            <Label>데이터 리스트</Label>
            <Line />
            {pageList !== undefined &&
              pageList.map((v, idx) => (
                <PageContainer
                  key={`${v.name}-${idx}`}
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
            <Line />
            {tableRow.map((rowName, idx) => (
              <InputContainer key={`${rowName}-${idx}`}>
                <LabelBox id={`${rowName}-${idx}`} key={`${rowName}+${idx}`}>
                  <InputBox
                    type="checkbox"
                    value={rowName}
                    id={`${rowName}-${idx}`}
                    key={`${rowName}^${idx}`}
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
    </Container>
  );
}
