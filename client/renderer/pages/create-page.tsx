import styled from "@emotion/styled";
import React, { ReactEventHandler, useRef, useState } from "react";
import TagList from "../molecule/TagList";
import { INPUT_LIST, PAGE_API, TAG_LIST } from "../constants";
import CustomTag from "../molecule/CustomTag";
import { H4, Button } from "../styles";
import CustomPage from "../molecule/CustomPage";
import { TagType } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import axios from "axios";
import { addPageState } from "../slices/pageSlice";
import Router from "next/router";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 240px auto;
`;

const SideContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--super-light-main-color);
  overflow: auto;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainHeaderContainer = styled.div`
  display: flex;
  width: 90%;
  height: 60px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PageNameInput = styled.input`
  height: 100%;
  border: 0;
  font-size: 20px;
  padding-left: 10px;
  outline: none;
`;

export default function CreatePage() {
  const [list] = useState<TagType[]>(TAG_LIST);
  const [pageTagList, setPageTagList] = useState<TagType[]>([]);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [dividerIdx, setDividerIdx] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [isSideList, setIsSideList] = useState(false);
  const [isCustom, setIsCustom] = useState<number>(-1);
  const [pageName, setPageName] = useState("");
  const HOST = useAppSelector((state) => state.axiosState).axiosState;
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const dispatch = useAppDispatch();

  const dragStarted = (
    e: React.DragEvent<HTMLDivElement>,
    id: any,
    isSideList: boolean
  ) => {
    if (isSideList) {
      e.dataTransfer.setData("listId", id);
    } else {
      e.dataTransfer.setData("pageId", id);
    }
    setIsSideList(isSideList);
    setIsDragging(true);
  };

  const draggingOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let sumHeight = -e.currentTarget.scrollTop;
    let idx = 0;
    let isSet = false;

    for (const { clientHeight } of itemRefs.current) {
      if (e.pageY < 152 + sumHeight + clientHeight / 2) {
        setDividerIdx(idx);
        isSet = true;
        break;
      }
      idx++;
      sumHeight += clientHeight;
    }
    if (!isSet) setDividerIdx(pageTagList.length);
  };

  const dragDropped = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(false);
    if (isSideList) {
      const transferListId = e.dataTransfer.getData("listId");
      if (transferListId === "") return;
      setPageTagList((pre) => {
        if (dividerIdx === 0) {
          return [list[parseInt(transferListId)], ...pre];
        } else if (dividerIdx === pageTagList.length) {
          return [...pre, list[parseInt(transferListId)]];
        }
        return [
          ...pre.slice(0, dividerIdx),
          list[parseInt(transferListId)],
          ...pre.slice(dividerIdx),
        ];
      });
    } else {
      const transferListId = e.dataTransfer.getData("pageId");
      if (dividerIdx === undefined) return;
      if (
        transferListId === "" ||
        parseInt(transferListId) === dividerIdx ||
        parseInt(transferListId) === dividerIdx - 1
      )
        return;

      setPageTagList((pre) => {
        const tmp = pre.splice(parseInt(transferListId), 1);
        if (dividerIdx === 0) {
          return [{ ...tmp[0] }, ...pre];
        } else if (dividerIdx === pageTagList.length + 1) {
          return [...pre, { ...tmp[0] }];
        }
        return [
          ...pre.slice(
            0,
            dividerIdx > parseInt(transferListId) ? dividerIdx - 1 : dividerIdx
          ),
          { ...tmp[0] },
          ...pre.slice(
            dividerIdx > parseInt(transferListId) ? dividerIdx - 1 : dividerIdx
          ),
        ];
      });
    }
  };

  const handleDeleteTag = (v: number) => {
    setPageTagList((pre) => [...pre.slice(0, v), ...pre.slice(v + 1)]);
  };

  const handleSave = async () => {
    try {
      const isInput =
        pageTagList.findIndex((v) => INPUT_LIST.includes(v.type)) === -1
          ? false
          : true;
      const data = {
        teamId: selectTeam.teamId,
        headerList: pageTagList.map((v) => v.tagProps.header),
        name: pageName,
        pageStatus: isInput ? "INCLUDE_INPUT" : "EXCLUDE_INPUT",
        content: pageTagList,
      };

      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${HOST}${PAGE_API.ADD}`, data, {
        headers: {
          Authorization: accessToken,
        },
      });
      Router.push("/view-page");
    } catch (e) {
      //      console.log(e.response.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value);
  };

  return (
    <Wrapper>
      <SideContainer>
        {isCustom !== -1 && pageTagList.length > 0 ? (
          <CustomTag
            setIsCustom={setIsCustom}
            setPageTagList={setPageTagList}
            pageTagList={pageTagList}
            isCustom={isCustom}
          />
        ) : (
          <TagList dragStarted={dragStarted} />
        )}
      </SideContainer>
      <MainContainer>
        <MainHeaderContainer>
          <TitleContainer>
            <H4>제목 : </H4>
            <PageNameInput
              placeholder="페이지 제목을 입력하세요."
              onChange={(e) => handleChange(e)}
            />
          </TitleContainer>
          <Button
            width="50px"
            height="40px"
            borderRadius="5px"
            fontSize="13px"
            onClick={() => {
              handleSave();
            }}
          >
            생성
          </Button>
        </MainHeaderContainer>
        <CustomPage
          dragStarted={dragStarted}
          draggingOver={draggingOver}
          dragDropped={dragDropped}
          handleDeleteTag={handleDeleteTag}
          itemRefs={itemRefs}
          pageTagList={pageTagList}
          isDragging={isDragging}
          dividerIdx={dividerIdx}
          isCustom={isCustom}
          setIsCustom={setIsCustom}
        />
      </MainContainer>
    </Wrapper>
  );
}
