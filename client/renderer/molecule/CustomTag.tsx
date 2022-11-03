import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../styles";
import { TagType } from "../types";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
`;

type CustomType = {
  obj: TagType[];
  setObj: Dispatch<SetStateAction<TagType[]>>;
  objIdx: number;
};

const CustomText = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <label>
      내용:
      <input
        type="text"
        id="1"
        defaultValue={obj[objIdx].tagProps.children}
        onChange={(e) =>
          setObj((pre: TagType[]) => {
            return [
              ...pre.slice(0, objIdx),
              {
                ...pre[objIdx],
                tagProps: {
                  ...pre[objIdx].tagProps,
                  children: e.target.value,
                },
              },
              ...pre.slice(objIdx + 1),
            ];
          })
        }
      />
    </label>
  );
};

const CustomInput = ({ obj, setObj, objIdx }: CustomType) => {
  return (
    <label>
      라벨:
      <input
        type="text"
        id="1"
        defaultValue={obj[objIdx].tagProps.header}
        onChange={(e) =>
          setObj((pre: TagType[]) => {
            return [
              ...pre.slice(0, objIdx),
              {
                ...pre[objIdx],
                tagProps: {
                  ...pre[objIdx].tagProps,
                  header: e.target.value,
                },
              },
              ...pre.slice(objIdx + 1),
            ];
          })
        }
      />
    </label>
  );
};

const Component: {
  [key: string]: React.FunctionComponent<{ [key: string]: any }>;
} = {
  text: CustomText,
  // list: List,
  // "date picker": DatePicker,
  input: CustomInput,
  // "file upload": FileUpload,
  // table: Table,
  // "check box": CheckBox,
  // "radio button": RadioButton,
  // "drop down": DropDown,
  // "text area": TextArea,
  // hyperlink: HyperLink,
  // button: ButtonComponent,
};

interface CustomTagProps {
  setIsCustom: (v: number) => void;
  setPageTagList: Dispatch<SetStateAction<TagType[]>>;
  isCustom: number;
  pageTagList: TagType[];
}

export default function CustomTag(props: CustomTagProps) {
  const CustomComponent = Component[props.pageTagList[props.isCustom].type];
  const [tmpPageTagList, setPageTagList] = useState<TagType[]>([
    ...props.pageTagList,
  ]);

  useEffect(() => {
    setPageTagList([...props.pageTagList]);
  }, [props.pageTagList]);

  return (
    <Container>
      {props.isCustom !== -1 && (
        <CustomComponent
          obj={tmpPageTagList}
          setObj={setPageTagList}
          objIdx={props.isCustom}
        ></CustomComponent>
      )}
      <Button
        width="80%"
        height="30px"
        background="var(--light-main-color)"
        borderRadius="5px"
        onClick={() => {
          props.setIsCustom(-1);
          props.setPageTagList([...tmpPageTagList]);
        }}
        style={{ margin: "0 auto" }}
      >
        수정 완료
      </Button>
    </Container>
  );
}
