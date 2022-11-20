import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import { TeamUserType, PageUserType } from "../types";
import DelMemberAdd from "./DelMemberAdd";

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

const RoleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
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
  role: string;
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => void;
}

export default function RoleMemberAdd(props: ItemProps) {
  const [buttonText, setButtonText] = useState<string>("취소");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
  const itemRole = useMemo(() => {
    if (props.role === "ADMIN" || props.role === "MANAGER") {
      return "관리자";
    } else if (props.role === "LEADER") {
      return "리더";
    } else if (props.role === "USER") {
      return "사용자";
    } else {
      return props.role;
    }
  }, []);
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
        <RoleContainer>{itemRole}</RoleContainer>
        <TextButtonContainer
          style={{ color: buttonColor }}
          onClick={(e) => {
            props.buttonFunction(e, buttonText, id, itemRole);
          }}
        >
          {buttonText}
        </TextButtonContainer>
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
