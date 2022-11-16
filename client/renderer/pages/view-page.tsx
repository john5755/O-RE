import styled from "@emotion/styled";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import CheckBox from "../molecule/TagComponent/CheckBox";
import DatePicker from "../molecule/TagComponent/DatePicker";
import Input from "../molecule/TagComponent/Input";
import List from "../molecule/TagComponent/List";
import RadioButton from "../molecule/TagComponent/RadioButton";
import BasicTable from "../molecule/TagComponent/BasicTable";
import Text from "../atom/TagComponent/Text";
import {
  EXCEL_API,
  INPUT_LIST,
  PAGE_API,
  PATH,
  USER_INPUT_API,
} from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { TagType } from "../types";
import { useClickTeam, useResetPage } from "../hooks/resetPageHook";
import { setSelectTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TagContainer = styled.div`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  height: 30px;
  width: 40px;
  border-radius: 4px;
  margin-right: 20px;
  color: white;
  border: none;
  background-color: var(--light-main-color);
`;

const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: Text,
  list: List,
  input: Input,
  table: BasicTable,
  "radio button": RadioButton,
  "date picker": DatePicker,
  "check box": CheckBox,
};

export default function ViewPage() {
  const [pageTagList, setPageTagList] = useState<TagType[]>();
  const [userInput, setUserInput] = useState<any>({});
  const pageInfo = useAppSelector((state) => state.pageState).selectPageState;
  const pageList = useAppSelector((state) => state.pageState).pageState;
  const selectPage = useAppSelector((state) => state.pageState).selectPageState;
  const teamInfo = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const isInput =
    pageTagList !== undefined &&
    pageTagList.findIndex((v) => INPUT_LIST.includes(v.type)) === -1
      ? false
      : true;
  const isTable =
    pageTagList !== undefined &&
    pageTagList.findIndex((v) => v.type === "table") === -1
      ? false
      : true;
  const dispatch = useAppDispatch();
  const clickTeam = useClickTeam();
  const resetPage = useResetPage();
  const handleClick = async () => {
    try {
      const data = { input: userInput, pageId: selectPage.pageId };
      await axios.post(USER_INPUT_API.ALL, data, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      resetPage();
      dispatch(
        setSelectTeamState({ idx: teamInfo.idx, teamId: teamInfo.teamId })
      );
      clickTeam();
      setUserInput({});
      Router.push(PATH.VIEW_PAGE);
    } catch (e) {}
  };

  const getPageList = async () => {
    try {
      const { data } = await axios.get(`${PAGE_API.DETAIL}${pageInfo.pageId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setPageTagList(data.data.contents);
    } catch (e) {}
  };
  useEffect(() => {
    if (pageList.length === 0 || pageInfo.idx === -1) {
      setPageTagList([]);
      return;
    }
    getPageList();
  }, [pageInfo.pageId, pageList]);

  const getExcel = async () => {
    try {
      const res = await axios.get(
        `${EXCEL_API.DOWNLOAD}/${pageInfo.pageId}`,

        {
          responseType: "blob",
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );

      const blob = res.data;
      const fileObjectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileObjectUrl;
      link.style.display = "none";

      link.download = `${pageList[pageInfo.idx].name}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {pageTagList !== undefined && pageTagList.length > 0 ? (
        pageTagList.map((v, index) => {
          const TagComponent = Component[v.type];
          return (
            TagComponent !== undefined && (
              <TagContainer key={`${v.type}-${index}`}>
                <TagComponent
                  {...{
                    ...v.tagProps,
                    ...(INPUT_LIST.includes(v.type) && {
                      userInput,
                      setUserInput,
                    }),
                  }}
                />

                <div
                  style={{
                    height: "15px",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                ></div>
              </TagContainer>
            )
          );
        })
      ) : (
        <div>Welcome O:RE</div>
      )}
      {isInput && (
        <ButtonWrapper>
          <Button onClick={handleClick}>저장</Button>
        </ButtonWrapper>
      )}
      {isTable && (
        <ButtonWrapper>
          <Button onClick={getExcel}>Excel</Button>
        </ButtonWrapper>
      )}
    </Container>
  );
}
