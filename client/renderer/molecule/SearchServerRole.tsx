import React, { useEffect, useState, useMemo } from "react";
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
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => void;
}

export default function SearchServerRole(props: ItemProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const [itemRole, setItemRole] = useState<string>(props.member.role);
  const originalRole = useMemo(() => {
    return props.member.role;
  }, []);
  const [buttonText, setButtonText] = useState<string>("변경");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
  const [dropDownDiabled, setDropDownDisabled] = useState<boolean>(false);
  const id = props.member.userId;

  useEffect(() => {
    setItemRole(props.member.role);
    setButtonText("변경");
    setButtonColor("#4F68A6");
  }, [props.member.role]);

  const buttonUIChange = () => {
    if (itemRole === props.member.role) {
      return;
    }
    if (buttonColor === "#4F68A6") {
      setButtonColor("#C74E4E");
      setButtonText("취소");
      setDropDownDisabled(true);
    } else {
      setButtonColor("#4F68A6");
      setButtonText("변경");
      setItemRole(props.member.role);
      setDropDownDisabled(false);
    }
  };

  const [delButtonText, setDelButtonText] = useState<string>("삭제");
  const [delButtonColor, setDelButtonColor] = useState<string>("#C74E4E");
  const cantDelOwner = props.member.role === "OWNER";
  const cantDelLeader =
    originalRole === "LEADER" && userProfile.role !== "OWNER";
  const cantDelSame = originalRole === userProfile.role;
  const cantDel = cantDelOwner || cantDelLeader || cantDelSame;
  const delButtonUIChange = () => {
    if (cantDel) {
      alert("권한이 없습니다.");
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
          disabled={dropDownDiabled}
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
        <TextButtonContainer
          onClick={(e) => {
            if (!cantDel) {
              props.buttonFunction(e, delButtonText, id, itemRole);
            }
            delButtonUIChange();
          }}
          style={{ color: delButtonColor, marginLeft: "5px" }}
        >
          {delButtonText}
        </TextButtonContainer>
      </ItemChangeContainer>
    </SearchItemContainer>
  );
}
