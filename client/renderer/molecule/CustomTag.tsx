import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../styles";
import { TagType } from "../types";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
`;

type CustomTextProps = {
  obj: any;
  setObj: (v: any) => void;
  objIdx: number;
};

const CustomText = ({ obj, setObj, objIdx }: CustomTextProps) => {
  console.log(obj);
  console.log(setObj);
  let copyObj = obj[objIdx];

  return (
    <label>
      내용:
      {/* <input
        type="text"
        id="1"
        defaultValue={obj[objIdx].tagProps.children}
        onChange={(e) => setObj((pre) => {...pre, tagProps:{
          children: 
        }})}
      /> */}
    </label>
  );
};

const Component: {
  [key: string]: React.FunctionComponent<{ [key: string]: any }>;
} = {
  //  text: CustomText,
  // list: List,
  // "date picker": DatePicker,
  // input: Input,
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
  pageTagList: any[];
}

export default function CustomTag(props: CustomTagProps) {
  const CustomComponent = Component[props.pageTagList[props.isCustom].type];
  const [tmpPageTagList, setPageTagList] = useState<any>({
    ...props.pageTagList,
  });
  return (
    <Container>
      {props.isCustom !== -1 && (
        <CustomComponent
          obj={tmpPageTagList}
          setObj={setPageTagList}
          objIdx={props.isCustom}
          //        {props.pageTagList[props.isCustom], props.setPageTagList)}
        ></CustomComponent>
      )}
      <Button
        width="80%"
        height="30px"
        background="var(--light-main-color)"
        borderRadius="5px"
        onClick={() => props.setIsCustom(-1)}
        style={{ margin: "0 auto" }}
      >
        수정 완료
      </Button>
    </Container>
  );
}
