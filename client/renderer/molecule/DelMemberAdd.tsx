import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import { TeamUserType, PageUserType } from "../types";

const SearchItemContainer = styled.div`
  border-bottom: 0.3px solid var(--light-main-color);
  width: 98%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemProfileConatiner = styled.div`
  width: 70%;
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
  member: TeamUserType | PageUserType;
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => void;
}

export default function DelMemberAdd(props: ItemProps) {
  const [buttonText, setButtonText] = useState<string>("복구");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
  const id = useMemo(() => {
    if (props.member.teamUserId !== undefined) {
      return props.member.teamUserId;
    } else if (props.member.pageUserId !== undefined) {
      return props.member.pageUserId;
    } else {
      return props.member.userId;
    }
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
            props.buttonFunction(e, buttonText, id, "삭제");
          }}
        >
          {buttonText}
        </TextButtonContainer>
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
