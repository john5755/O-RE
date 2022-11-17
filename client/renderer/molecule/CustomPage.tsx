import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import BasicTable from "./TagComponent/BasicTable";
import Text from "../atom/TagComponent/Text";
import Input from "./TagComponent/Input";
import { TagType } from "../types";
import RadioButton from "./TagComponent/RadioButton";
import DatePicker from "./TagComponent/DatePicker";
import CheckBox from "./TagComponent/CheckBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const PageContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

type ComponentBoxProps = {
  highlighted: boolean;
};
const ComponentBox = styled.div<ComponentBoxProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px auto;
  :hover {
    background-color: var(--super-light-main-color);
  }
  background-color: ${(props) =>
    props.highlighted && `var(--super-light-main-color)`};
`;

const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: Text,
  "date picker": DatePicker,
  input: Input,
  table: BasicTable,
  "check box": CheckBox,
  "radio button": RadioButton,
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
  handleDeleteTag: (v: number) => void;
  setIsCustom: Dispatch<SetStateAction<number>>;
  pageTagList: TagType[];
  dividerIdx: number | undefined;
  isDragging: boolean;
  itemRefs: MutableRefObject<HTMLDivElement[]>;
  isCustom: number;
}

export default function CustomPage(props: CustomPageProps) {
  return (
    <PageContainer
      onDragOver={(e) => props.draggingOver(e)}
      onDrop={(e) => props.dragDropped(e)}
    >
      {props.pageTagList.length > 0 &&
        props.pageTagList.map((v, index) => {
          const TagComponent = Component[v.type];
          return (
            TagComponent !== undefined && (
              <React.Fragment key={`${v.type}-${index}`}>
                <ComponentBox
                  ref={(el) => {
                    if (!el) return;
                    props.itemRefs.current[index] = el;
                  }}
                  onDragStart={(e) => props.dragStarted(e, index, false)}
                  onDragOver={(e) => props.draggingOver(e)}
                  onDrop={(e) => props.dragDropped(e)}
                  onClick={() => props.setIsCustom(index)}
                  draggable
                  highlighted={index === props.isCustom}
                >
                  <TagComponent {...v.tagProps} />
                  {props.isCustom !== -1 && props.isCustom === index && (
                    <DeleteOutlineIcon
                      color="disabled"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.setIsCustom(-1);
                        props.handleDeleteTag(index);
                      }}
                    />
                  )}
                </ComponentBox>
                {props.dividerIdx !== undefined &&
                  index + 1 === props.dividerIdx &&
                  props.isDragging && (
                    <div
                      style={{ width: "100%", borderBottom: "1px solid red" }}
                    />
                  )}
              </React.Fragment>
            )
          );
        })}
    </PageContainer>
  );
}
