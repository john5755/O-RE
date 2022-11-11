import React, { useState } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import { TeamUserType } from "../types";
import { useAppSelector } from "../hooks/reduxHook";

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
  buttonText: string;
  buttonColor: string;
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number
  ) => void;
}

export default function SearchItemAdd(props: ItemProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const [buttonText, setButtonText] = useState<string>(props.buttonText);
  const [buttonColor, setButtonColor] = useState<string>(props.buttonColor);
  const id =
    props.member.teamUserId !== undefined
      ? props.member.teamUserId
      : props.member.userId;

  const buttonUIChange = () => {
    if (buttonColor === "#4F68A6") {
      setButtonColor("#C74E4E");
      setButtonText("취소");
    } else {
      setButtonColor("#4F68A6");
      setButtonText("추가");
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
        <TextButtonContainer
          style={{ color: buttonColor }}
          onClick={(e) => {
            props.buttonFunction(e, buttonText, id);
            buttonUIChange();
          }}
        >
          {buttonText}
        </TextButtonContainer>
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
