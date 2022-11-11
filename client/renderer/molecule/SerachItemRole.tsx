import React, { useState } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import TeamDropDown from "./TeamDropdown";
import { TeamUserType, ServerRoleMenues, TeamRoleMenues } from "../types";
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

export default function SearchItemRole(props: ItemProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const [itemRole, setItemRole] = useState<string>(props.member.role);
  const [buttonText, setButtonText] = useState<string>(props.buttonText);
  const [buttonColor, setButtonColor] = useState<string>(props.buttonColor);
  const id =
    props.member.teamUserId !== undefined
      ? props.member.teamUserId
      : props.member.userId;

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

  const [delButtonText, setDelButtonText] = useState<string>("삭제");
  const [delButtonColor, setDelButtonColor] = useState<string>("#C74E4E");
  const delButtonUIChange = () => {
    const cantDelOwner = props.member.role === "OWNER";
    const cantDelSame =
      props.member.role === "LEADER" && userProfile.role !== "OWNER";
    if (cantDelOwner && cantDelSame) {
      alert("권한을 변경할 수 없습니다.");
      return;
    }
    if (delButtonText === "삭제") {
      setDelButtonText("복구");
      setDelButtonColor("#4F68A6");
    } else {
      setDelButtonText("삭제");
      setDelButtonColor("#C74E4E");
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
            props.buttonFunction(e, buttonText, id, itemRole);
            buttonUIChange();
          }}
        >
          {buttonText}
        </TextButtonContainer>
        {props.MenuItems.hasOwnProperty("LEADER") && (
          <TextButtonContainer
            onClick={(e) => {
              props.buttonFunction(e, "삭제", id, itemRole);
              delButtonUIChange();
            }}
            style={{ color: delButtonColor, marginLeft: "5px" }}
          >
            {delButtonText}
          </TextButtonContainer>
        )}
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
