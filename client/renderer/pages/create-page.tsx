import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { TAG_LIST } from "../constants";
import { useAppDispatch } from "../hooks/reduxHook";
import { setListStateTrue, setListStateFalse } from "../slices/listSlices";

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
  -webkit-scrollbar {
    display: block;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--light-gray-color);
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end {
    background: transparent;
    margin-bottom: 10px;
  }
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
  -webkit-scrollbar {
    display: block;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--light-gray-color);
    border-right: none;
    border-left: none;
  }
  ::-webkit-scrollbar-track-piece::end {
    background: transparent;
    margin-bottom: 10px;
  }
`;

export default function CreatePage() {
  const dispatch = useAppDispatch();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [list, setList] = useState(TAG_LIST);
  const [itemList, setItemList] = useState<{ type: string }[]>([]);
  console.log(itemList);

  const dragStarted = (e: any, id: any, isList: boolean) => {
    console.log("Drag has started");
    if (isList) {
      e.dataTransfer.setData("listId", id);
    } else {
      e.dataTransfer.setData("pageId", id);
    }
  };

  const draggingOver = (e: any) => {
    e.preventDefault();
    console.log("Dragging Over Now");
  };

  const dragDropped = (e: any, position: any, isList: boolean) => {
    console.log("You have dropped!", isList);
    if (isList) {
      let transferListId = e.dataTransfer.getData("listId");
      if (transferListId === "") return;
      setItemList((prev) => [...prev, { type: transferListId }]);
      console.log(transferListId);
    } else {
      let transferListId = e.dataTransfer.getData("pageId");
      console.log(position);
      console.log(dragOverItem);
      console.log(transferListId);
    }
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
  };

  return (
    <Wrapper>
      <SideContainer>
        <ItemContainer>
          {list.map((v, index) => (
            <ItemButton>
              <Item
                key={v.type}
                onDragStart={(e) => dragStarted(e, v.type, true)}
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
        onDrop={(e) => dragDropped(e, itemList.length, true)}
      >
        {itemList.map((v, index) => (
          <Item
            key={v.type}
            onDragStart={(e) => dragStarted(e, index, false)}
            onDragEnter={(e) => {
              dragEnter(e, index);
            }}
            onDragOver={(e) => draggingOver(e)}
            onDrop={(e) => dragDropped(e, index, false)}
            draggable
          >
            {v.type}
          </Item>
        ))}
      </MainContainer>
    </Wrapper>
  );
}
{
  /* <div>
      create-page
      <button
        onClick={() => {
          dispatch(setListStateFalse());
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          dispatch(setListStateTrue());
        }}
      >
        수정 완료
      </button>
    </div> */
}
