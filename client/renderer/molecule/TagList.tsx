import styled from "@emotion/styled";
import React, { useState } from "react";
import { TAG_LIST } from "../constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
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

interface TagListProps {
  dragStarted: (
    e: React.DragEvent<HTMLDivElement>,
    id: any,
    isSideList: boolean
  ) => void;
}

export default function TagList(props: TagListProps) {
  const [list] = useState(TAG_LIST);
  return (
    <Container>
      {list.map((v, index) => (
        <ItemButton key={`${v}-${index}`}>
          <Item
            key={v.type}
            onDragStart={(e) => props.dragStarted(e, index, true)}
            draggable
          >
            {v.type}
          </Item>
        </ItemButton>
      ))}
    </Container>
  );
}
