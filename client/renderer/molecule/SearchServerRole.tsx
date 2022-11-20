import React, { useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { H4 } from "../styles";
import TeamDropDown from "./TeamDropdown";
import { TeamUserType, ServerRoleMenues, TeamRoleMenues } from "../types";
import { useAppSelector } from "../hooks/reduxHook";
import CustomAlert from "./CustomAlert";
import { AlertColor } from "@mui/material";

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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const [itemRole, setItemRole] = useState<string>(props.member.role);
  const originalRole = useMemo(() => {
    return props.member.role;
  }, []);
  const [buttonText, setButtonText] = useState<string>("변경");
  const [buttonColor, setButtonColor] = useState<string>("#4F68A6");
  const id = props.member.userId;

  useEffect(() => {
    setItemRole(props.member.role);
    setButtonText("변경");
    setButtonColor("#4F68A6");
  }, [props.member.userId]);

  const buttonUIChange = () => {
    if (itemRole === props.member.role) {
      return;
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
      setAlertMessage("권한을 변경할 수 없습니다.");
      setSeverity("warning");
      setAlertOpen(true);
      return;
    }
  };

  return (
    <SearchItemContainer>
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={severity}
      ></CustomAlert>
      <ItemProfileConatiner>
        <CurrentProfile src={props.member.profileImage}></CurrentProfile>
        <H4
          style={{ marginLeft: "5px", paddingTop: "3px", whiteSpace: "nowrap" }}
        >
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
