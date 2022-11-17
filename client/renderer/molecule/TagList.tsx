import styled from "@emotion/styled";
import React, { useState } from "react";
import { TAG_LIST } from "../constants";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import TodayIcon from "@mui/icons-material/Today";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px 0;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  padding: 0 0 0 6px;
`;

const ItemButton = styled.div`
  display: flex;
  width: 80%;
  height: 30px;
  margin: 0 auto;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--light-main-color);
  }
`;

interface TagListProps {
  dragStarted: (
    e: React.DragEvent<HTMLDivElement>,
    id: any,
    isSideList: boolean
  ) => void;
}

const IconComponent: { [key: string]: React.FunctionComponent<any> } = {
  text: FormatColorTextIcon,
  "date picker": TodayIcon,
  input: KeyboardIcon,
  table: BorderAllIcon,
  "check box": CheckBoxIcon,
  "radio button": RadioButtonCheckedIcon,
};

export default function TagList(props: TagListProps) {
  const [list] = useState(TAG_LIST);
  return (
    <Container>
      {list.map((v, index) => {
        const Icon = IconComponent[v.type];
        return (
          <ItemButton
            key={`${v}-${index}`}
            onDragStart={(e) => props.dragStarted(e, index, true)}
            draggable
          >
            <Icon
              size="small"
              style={{
                fill: "#333333",
                fontSize: "18px",
                onmouseover: { fill: "red" },
              }}
            />
            <Item key={v.type}>{v.name}</Item>
          </ItemButton>
        );
      })}
    </Container>
  );
}
