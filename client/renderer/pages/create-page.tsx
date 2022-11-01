import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import TagList from "../molecule/TagList";
import { TAG_LIST } from "../constants";
import CustomTag from "../molecule/CustomTag";
import { H4, Button } from "../styles";
import CustomPage from "../molecule/CustomPage";

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
  height: 7%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

export default function CreatePage() {
  const [list] = useState(TAG_LIST);
  const [pageTagList, setPageTagList] = useState<any[]>([]);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [dividerIdx, setDividerIdx] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [isSideList, setIsSideList] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

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
    let sumHeight = 0;
    let idx = 0;
    let isSet = false;
    for (const { clientHeight } of itemRefs.current) {
      if (e.pageY < 100 + sumHeight + clientHeight / 2) {
        setDividerIdx(idx);
        isSet = true;
        break;
      }
      idx++;
      sumHeight += clientHeight;
    }
    if (!isSet) setDividerIdx(pageTagList.length);
    console.log(dividerIdx);
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

  const handleClick = (v: any) => {
    setIsCustom(true);
  };

  const handleDeleteTag = (v: number) => {
    setPageTagList((pre) => [...pre.slice(0, v), ...pre.slice(v + 1)]);
  };

  return (
    <Wrapper>
      <SideContainer>
        {isCustom ? (
          <CustomTag setIsCustom={setIsCustom} />
        ) : (
          <TagList dragStarted={dragStarted} />
        )}
      </SideContainer>
      <MainContainer>
        <MainHeaderContainer>
          <H4 style={{}}>페이지 예시</H4>
          <Button width="50px" height="20px" borderRadius="5px" fontSize="10px">
            생성
          </Button>
        </MainHeaderContainer>
        <CustomPage
          dragStarted={dragStarted}
          draggingOver={draggingOver}
          dragDropped={dragDropped}
          handleClick={handleClick}
          handleDeleteTag={handleDeleteTag}
          itemRefs={itemRefs}
          pageTagList={pageTagList}
          isDragging={isDragging}
          dividerIdx={dividerIdx}
          isCustom={isCustom}
        />
      </MainContainer>
    </Wrapper>
  );
}
