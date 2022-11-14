import styled from "@emotion/styled";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import CheckBox from "../atom/CheckBox";
import DatePicker from "../atom/DatePicker";
import Input from "../atom/Input";
import List from "../atom/List";
import RadioButton from "../atom/RadioButton";
import BasicTable from "../atom/BasicTable";
import Text from "../atom/Text";
import { INPUT_LIST, PAGE_API, PATH, USER_INPUT_API } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { Button } from "../styles";
import { TagType } from "../types";
import { useClickTeam, useResetPage } from "../hooks/resetPageHook";
import { setSelectTeamState } from "../slices/myTeamsStateSlice";
import Router from "next/router";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TagContainer = styled.div`
  padding: 10px;
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
      Router.push(PATH.VIEW_PAGE);
    } catch (e) {}
  };

  const getPageList = async () => {
    const { data } = await axios.get(`${PAGE_API.DETAIL}${pageInfo.pageId}`, {
      headers: { Authorization: localStorage.getItem("accessToken") },
    });
    setPageTagList(data.data.contents);
  };

  useEffect(() => {
    if (pageList.length === 0 || pageInfo.idx === -1) {
      setPageTagList([]);
      return;
    }
    getPageList();
  }, [pageInfo.pageId, pageList]);

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
        <Button
          width="100px"
          height="50px"
          onClick={handleClick}
          borderRadius="10px"
        >
          저장
        </Button>
      )}
    </Container>
  );
}
