import React, { useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import TeamDropDown from "./TeamDropdown";
import PageDropDown from "./PageDropDown";
import {
  PageUserType,
  PageRoleMenues,
  ServerRoleMenues,
  TeamRoleMenues,
} from "../types";
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
  role: string;
  member: PageUserType;
  MenuItems: PageRoleMenues;
  buttonFunction: (
    event: React.MouseEvent,
    buttonText: string,
    userId: number,
    role: string
  ) => void;
}

export default function SearchPageRole(props: ItemProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const myPageRole = props.role;
  const originalRole = useMemo(() => {
    return props.member.pageUserRole;
  }, []);
  const [itemRole, setItemRole] = useState<string>(props.member.pageUserRole);
  const [buttonText, setButtonText] = useState<string>("변경");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
  const id = props.member.pageUserId;

  const buttonUIChange = () => {
    if (itemRole === props.member.pageUserRole) {
      return;
    }
    if (buttonColor === "#4F68A6") {
      setButtonColor("#C74E4E");
      setButtonText("취소");
    } else {
      setButtonColor("#4F68A6");
      setButtonText("변경");
      setItemRole(props.member.pageUserRole);
    }
  };

  const [delButtonText, setDelButtonText] = useState<string>("삭제");
  const [delButtonColor, setDelButtonColor] = useState<string>("#C74E4E");
  const cantDelOwner = props.member.pageUserRole === "OWNER";
  const cantDelMaintainer =
    originalRole === "Maintainer" && userProfile.role !== "OWNER";
  const cantDelSame = originalRole === myPageRole;
  const cantDel = cantDelOwner || cantDelMaintainer || cantDelSame;
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

  useEffect(() => {
    setItemRole(props.member.pageUserRole);
    setButtonText("변경");
    setButtonColor("#4F68A6");
    setDelButtonText("삭제");
    setDelButtonColor("#C74E4E");
  }, [props.member]);

  return (
    <SearchItemContainer>
      <ItemProfileConatiner>
        <CurrentProfile src={props.member.profileImage}></CurrentProfile>
        <H4
          style={{ marginLeft: "5px", paddingTop: "3px", whiteSpace: "nowrap" }}
        >
          {props.member.name}({props.member.nickname})
        </H4>
      </ItemProfileConatiner>
      <ItemChangeContainer>
        <PageDropDown
          role={myPageRole}
          category={itemRole}
          setCategory={setItemRole}
          MenuItems={props.MenuItems}
        ></PageDropDown>
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
