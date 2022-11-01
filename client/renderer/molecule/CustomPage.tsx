import styled from "@emotion/styled";
import React from "react";
import { Button } from "../styles";

const PageContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
  overflow: auto;
  border: 1px solid black;
`;

const ComponentBox = styled.div`
  display: flex;
  justify-content: space-between;
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
const PageButton = styled.button<{ props: any }>`
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
  button: PageButton,
};

interface MutableRefObject<T> {
  current: T;
}

interface CustomPageProps {
  dragStarted: (
    e: React.DragEvent<HTMLDivElement>,
    id: any,
    isSideList: boolean
  ) => void;
  draggingOver: (e: React.DragEvent<HTMLDivElement>) => void;
  dragDropped: (e: React.DragEvent<HTMLDivElement>) => void;
  handleClick: (v: any) => void;
  handleDeleteTag: (v: number) => void;
  pageTagList: any[];
  dividerIdx: number | undefined;
  isDragging: boolean;
  itemRefs: MutableRefObject<HTMLDivElement[]>;
  isCustom: boolean;
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <PageContainer
      onDragOver={(e) => props.draggingOver(e)}
      onDrop={(e) => props.dragDropped(e)}
    >
      {props.pageTagList.map((v, index) => {
        const TagComponent = Component[v.type];

        return (
          TagComponent !== undefined && (
            <ComponentBox
              key={`${v.type}-${index}`}
              ref={(el) => {
                if (!el) return;
                props.itemRefs.current[index] = el;
              }}
              onDragStart={(e) => props.dragStarted(e, index, false)}
              onDragOver={(e) => props.draggingOver(e)}
              onDrop={(e) => props.dragDropped(e)}
              onClick={() => props.handleClick(v)}
              draggable
            >
              <TagComponent props={v} />
              {props.isCustom && (
                <Button
                  width="50px"
                  height="20px"
                  onClick={() => props.handleDeleteTag(index)}
                >
                  삭제
                </Button>
              )}
              {props.dividerIdx !== undefined &&
                index + 1 === props.dividerIdx &&
                props.isDragging && (
                  <div style={{ width: "100%", border: "1px solid red" }} />
                )}
            </ComponentBox>
          )
        );
      })}
    </PageContainer>
  );
}
