import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../styles";
import CustomCheckBox from "../template/TagCustomComponent/CustomCheckBox";
import CustomDatePicker from "../template/TagCustomComponent/CustomDatePicker";
import CustomInput from "../template/TagCustomComponent/CustomInput";
import CustomRadioButton from "../template/TagCustomComponent/CustomRadioButton";
import CustomTable from "../template/TagCustomComponent/CustomTable";
import CustomText from "../template/TagCustomComponent/CustomText";
import { TagType } from "../types";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
  width: 100%;
  padding: 20px 0;
  margin: 0 auto;
  text-align: center;
  align-items: center;
`;

const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: CustomText,
  "date picker": CustomDatePicker,
  input: CustomInput,
  table: CustomTable,
  "check box": CustomCheckBox,
  "radio button": CustomRadioButton,
};

interface CustomTagProps {
  setIsCustom: (v: number) => void;
  setPageTagList: Dispatch<SetStateAction<TagType[]>>;
  isCustom: number;
  pageTagList: TagType[];
}

export default function CustomTag(props: CustomTagProps) {
  const [tmpPageTagList, setPageTagList] = useState<TagType[]>([
    ...props.pageTagList,
  ]);

  useEffect(() => {
    setPageTagList([...props.pageTagList]);
  }, [props.pageTagList, props.isCustom]);
  if (props.pageTagList[props.isCustom] === undefined) return null;
  const CustomComponent = Component[props.pageTagList[props.isCustom].type];
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
