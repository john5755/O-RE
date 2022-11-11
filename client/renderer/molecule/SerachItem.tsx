import React, {
  useState,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
} from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import TeamDropDown from "./TeamDropdown";
import { TeamUserType, ServerRoleMenues, TeamRoleMenues } from "../types";

const SearchItemContainer = styled.div`
  border-bottom: 0.3px solid var(--light-main-color);
  width: 98%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemProfileConatiner = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const ItemChangeContainer = styled.div`
  display: flex;
`;

const TextButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CurrentProfile = styled.img`
  width: 40px;
  height: 40px;
`;

interface ItemProps {
  member: TeamUserType;
  MenuItems: ServerRoleMenues | TeamRoleMenues;
  buttonText: string;
  buttonColor: string;
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => void;
}

export default function SearchItem(props: ItemProps) {
  const [itemRole, setItemRole] = useState<string>(props.member.role);
  const [buttonText, setButtonText] = useState<string>(props.buttonText);
  const [buttonColor, setButtonColor] = useState<string>(props.buttonColor);

  const buttonUIChange = () => {
    if (itemRole === props.member.role) {
      return;
    }
    if (buttonColor === "#4F68A6") {
      setButtonColor("#C74E4E");
      setButtonText("취소");
    } else {
      setButtonColor("#4F68A6");
      setButtonText("변경");
      setItemRole(props.member.role);
    }
  };

  return (
    <SearchItemContainer>
      <ItemProfileConatiner>
        <CurrentProfile src={props.member.profileImage}></CurrentProfile>
        <H4>
          {props.member.name}({props.member.nickname})
        </H4>
      </ItemProfileConatiner>
      <ItemChangeContainer>
        <TeamDropDown
          category={itemRole}
          setCategory={setItemRole}
          MenuItems={props.MenuItems}
        ></TeamDropDown>
        <TextButtonContainer
          style={{ color: buttonColor }}
          onClick={(e) => {
            props.buttonFunction(e, buttonText, props.member.userId, itemRole);
            buttonUIChange();
          }}
        >
          {buttonText}
        </TextButtonContainer>
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
