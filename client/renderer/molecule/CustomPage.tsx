import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";
import { Button } from "../styles";

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
  :focus {
    border: 1px solid var(--main-color);
  }
  :hover {
    border: 3px solid var(--main-color);
  }
  border: ${(props) => props.highlighted && `3px solid var(--main-color)`};
`;

type ListProps = PropsWithChildren<{
  count?: number;
  style?: React.CSSProperties;
  children?: string[];
  header?: string;
}>;

const List = ({ count, header, children, ...props }: ListProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      {count !== undefined &&
        children !== undefined &&
        [...Array(count)].map((v, index) => (
          <li {...props} key={`${index} - ${v}`}>
            {children[index]}
          </li>
        ))}
    </div>
  );
};

type TextProps = PropsWithChildren<{
  style?: React.CSSProperties;
  children?: string;
}>;
const Text = ({ children, ...props }: TextProps) => {
  return <div {...props}>{children}</div>;
};

type InputProps = PropsWithChildren<{
  style?: React.CSSProperties;
  header?: string;
  children?: string;
}>;

const Input = ({ children, header, ...props }: InputProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <input {...props}></input>
    </div>
  );
};

type ButtonComponentProps = PropsWithChildren<{
  children?: string;
  header?: string;
  style?: React.CSSProperties;
}>;

const ButtonComponent = ({
  children,
  header,
  ...props
}: ButtonComponentProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <button {...props}>{children}</button>
    </div>
  );
};

type TextAreaProps = {
  style?: React.CSSProperties;
  header?: string;
};

const TextArea = ({ header, ...props }: TextAreaProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <textarea {...props}></textarea>
    </div>
  );
};

type FileUploadProps = {
  style?: React.CSSProperties;
  header?: string;
};

const FileUpload = ({ header, ...props }: FileUploadProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <input {...props}></input>
    </div>
  );
};

type RadioButtonProps = {
  header?: string;
  label?: string[];
  style?: React.CSSProperties;
};

const RadioButton = ({ header, label, ...props }: RadioButtonProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}

      {label?.map((v, _) => (
        <div key={v} style={{ display: "flex", textAlign: "center" }}>
          <input {...props} />
          <label>{v}</label>
        </div>
      ))}
    </div>
  );
};

type HyperLinkProps = {
  style?: React.CSSProperties;
  header?: string;
  children?: string;
};

const HyperLink = ({ header, children, ...props }: HyperLinkProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <a {...props}>{children}</a>
    </div>
  );
};

type CheckBoxProps = {
  header?: string;
  label?: string[];
  style?: React.CSSProperties;
};

const CheckBox = ({ header, label, ...props }: CheckBoxProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}

      {label?.map((v) => (
        <div key={v} style={{ display: "flex", textAlign: "center" }}>
          <input {...props} />
          <label>{v}</label>
        </div>
      ))}
    </div>
  );
};

type DropDownProps = {
  style?: React.CSSProperties;
  header?: string;
  option?: string[];
};

const DropDown = ({ header, option, ...props }: DropDownProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <select {...props}>
        {option?.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

type DatePickerProps = {
  style?: React.CSSProperties;
  header?: string;
};

const DatePicker = ({ header, ...props }: DatePickerProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <input {...props} />
    </div>
  );
};

type TableProps = {
  style?: React.CSSProperties;
  header?: string;
  row?: number;
  column?: number;
};

const Table = ({ header, row, column, ...props }: TableProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <table {...props}>
        {row !== undefined &&
          column !== undefined &&
          [...Array(row)].map((_) => (
            <tr style={{ border: "1px solid black" }}>
              {[...Array(column)].map((_) => (
                <td style={{ border: "1px solid black" }}></td>
              ))}
            </tr>
          ))}
      </table>
    </div>
  );
};

const Component: {
  [key: string]: React.FunctionComponent<{ [key: string]: any }>;
} = {
  text: Text,
  list: List,
  "date picker": DatePicker,
  input: Input,
  "file upload": FileUpload,
  table: Table,
  "check box": CheckBox,
  "radio button": RadioButton,
  "drop down": DropDown,
  "text area": TextArea,
  hyperlink: HyperLink,
  button: ButtonComponent,
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
  handleClick: (v: number) => void;
  handleDeleteTag: (v: number) => void;
  setIsCustom: (v: number) => void;
  pageTagList: any[];
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
      {props.pageTagList.map((v, index) => {
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
                onClick={() => props.handleClick(index)}
                draggable
                highlighted={index === props.isCustom}
              >
                <TagComponent {...v.tagProps} />
                {props.isCustom !== -1 && props.isCustom === index && (
                  <Button
                    width="50px"
                    height="20px"
                    onClick={() => {
                      props.handleDeleteTag(index);
                      props.setIsCustom(-1);
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
