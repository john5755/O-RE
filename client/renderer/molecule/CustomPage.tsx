import styled from "@emotion/styled";
import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import List from "../atom/List";
import BasicTable from "../atom/BasicTable";
import Text from "../atom/Text";
import Input from "../atom/Input";
import { Button } from "../styles";
import { TagType } from "../types";
import RadioButton from "../atom/RadioButton";
import DatePicker from "../atom/DatePicker";
import CheckBox from "../atom/CheckBox";

const PageContainer = styled.div`
  width: 90%;
  height: 85%;
  margin: 0 auto;
  padding: 20px;
  overflow: auto;
  border: 1px solid black;
`;

type ComponentBoxProps = {
  highlighted: boolean;
};
const ComponentBox = styled.div<ComponentBoxProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  :hover {
    border: 2px solid var(--light-main-color);
  }
  border: ${(props) => props.highlighted && `2px solid var(--main-color)`};
`;

// type TextAreaProps = {
//   style?: React.CSSProperties;
//   header?: string;
// };

// const TextArea = ({ header, ...props }: TextAreaProps) => {
//   return (
//     <div style={{ display: "grid" }}>
//       {header !== "" && <div>{header}</div>}
//       <textarea {...props}></textarea>
//     </div>
//   );
// };

// type FileUploadProps = {
//   style?: React.CSSProperties;
//   header?: string;
// };

// const FileUpload = ({ header, ...props }: FileUploadProps) => {
//   return (
//     <div style={{ display: "grid" }}>
//       {header !== "" && <div>{header}</div>}
//       <input {...props}></input>
//     </div>
//   );
// };

// type HyperLinkProps = {
//   style?: React.CSSProperties;
//   header?: string;
//   children?: string;
// };

// const HyperLink = ({ header, children, ...props }: HyperLinkProps) => {
//   return (
//     <div style={{ display: "grid" }}>
//       {header !== "" && <div>{header}</div>}
//       <a {...props}>{children}</a>
//     </div>
//   );
// };

// type DropDownProps = {
//   style?: React.CSSProperties;
//   header?: string;
//   option?: string[];
// };

// const DropDown = ({ header, option, ...props }: DropDownProps) => {
//   return (
//     <div style={{ display: "grid" }}>
//       {header !== "" && <div>{header}</div>}
//       <select {...props}>
//         {option?.map((v) => (
//           <option key={v} value={v}>
//             {v}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

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
                    <Button
                      width="50px"
                      height="20px"
                      fontSize="11px"
                      borderRadius="4px"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.setIsCustom(-1);
                        props.handleDeleteTag(index);
                      }}
                    >
                      삭제
                    </Button>
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
