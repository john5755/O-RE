import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import { TeamUserType } from "../types";

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
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number
  ) => void;
}

export default function SearchTeamAdd(props: ItemProps) {
  const [buttonText, setButtonText] = useState<string>("초대");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
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
      setButtonText("초대");
    }
  };

  useEffect(() => {
    setButtonText("초대");
    setButtonColor("#4F68A6");
  }, [props.member]);

  return (
    <SearchItemContainer>
      <ItemProfileConatiner>
        <CurrentProfile src={props.member.profileImage}></CurrentProfile>
        <H4 style={{ marginLeft: "5px", paddingTop: "3px" }}>
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
