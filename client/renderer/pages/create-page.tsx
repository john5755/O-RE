import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { TAG_LIST } from "../constants";

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

const ItemButton = styled.div`
  width: 80%;
  height: 30px;
  margin: 0 auto;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: var(--light-main-color);
    color: white;
  }
`;

const Item = styled.div`
  padding: 2px 0 0 10px;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ComponentBox = styled.div`
  :focus {
    border: 1px solid var(--main-color);
  }
  :hover {
    border: 1px solid var(--main-color);
  }
`;

const Text = styled.h1<{ props: any }>`
  background-color: yellow;
`;
const List = styled.li<{ props: any }>``;
const Input = styled.input<{ props: any }>``;
const Div = styled.div<{ props: any }>``;
const Button = styled.button<{ props: any }>`
  width: ${({ props }) => props.width};
  height: 100px;
`;

const Component: { [key: string]: React.FunctionComponent<{ props: any }> } = {
  text: Text,
  list: List,
  calendar: Div,
  "date picker": Div,
  input: Input,
  "file upload": Div,
  table: Div,
  "check box": Div,
  "radio button": Div,
  "drop down": Div,
  "text area": Div,
  hyperlink: Div,
  button: Button,
};

export default function CreatePage() {
  const [list] = useState(TAG_LIST);
  const [pageTagList, setPageTagList] = useState<any[]>([]);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [dividerIdx, setDividerIdx] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [isSideList, setIsSideList] = useState(false);

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
      if (e.pageY < 72 + sumHeight + clientHeight / 2) {
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
      console.log("nowId : ", transferListId);
      if (transferListId === "") return;
      setPageTagList((pre) => {
        if (dividerIdx === 0) {
          return [list[parseInt(transferListId)], ...pre];
        } else if (dividerIdx === pageTagList.length) {
          return [...pre, list[parseInt(transferListId)]];
        }
        return [
          ...pre.slice(0, dividerIdx),
          e.dataTransfer.getData("listId"),
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

  return (
    <Wrapper>
      <SideContainer>
        <ItemContainer>
          {list.map((v, index) => (
            <ItemButton key={`${v}-${index}`}>
              <Item
                key={v.type}
                onDragStart={(e) => dragStarted(e, index, true)}
                draggable
              >
                {v.type}
              </Item>
            </ItemButton>
          ))}
        </ItemContainer>
      </SideContainer>
      <MainContainer
        onDragOver={(e) => draggingOver(e)}
        onDrop={(e) => dragDropped(e)}
      >
        {pageTagList.map((v, index) => {
          const TagComponent = Component[v.type];

          return (
            TagComponent !== undefined && (
              <ComponentBox
                key={`${v.type}-${index}`}
                ref={(el) => {
                  if (!el) return;
                  itemRefs.current[index] = el;
                }}
                onDragStart={(e) => dragStarted(e, index, false)}
                onDragOver={(e) => draggingOver(e)}
                onDrop={(e) => dragDropped(e)}
                draggable
              >
                <TagComponent props={v} />
                {dividerIdx !== undefined &&
                  index + 1 === dividerIdx &&
                  isDragging && (
                    <div style={{ width: "100%", border: "1px solid red" }} />
                  )}
              </ComponentBox>
            )
          );
        })}
      </MainContainer>
    </Wrapper>
  );
}
