import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";
import { TeamUserType, ServerRoleMenues, TeamRoleMenues } from "../types";
import { H4 } from "../styles";
import TeamDropDown from "./TeamDropdown";

const ResultContainer = styled.div`
  height: 220px;
  padding: 5px;
  overflow-y: auto;
`;

const ResultItemContainer = styled.div`
  border-bottom: 0.3px solid var(--light-main-color);
  width: 98%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemNameConatiner = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const CurrentProfile = styled.img`
  width: 40px;
  height: 40px;
`;

const TextButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface SearchResultProps {
  ResultList: Array<TeamUserType>;
  textButtonColor: string;
  textButtonText: string;
  needDropdown: boolean;
  menuItems: ServerRoleMenues | TeamRoleMenues;
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  handleButtonEvent?: () => void;
}

export default function SearchResults(props: SearchResultProps) {
  const [tempCategory, setTempCategory] = useState("");
  return (
    <ResultContainer>
      {props.ResultList.map((member, idx) => (
        <ResultItemContainer key={idx}>
          <ItemNameConatiner>
            <CurrentProfile src={member.profileImage}></CurrentProfile>
            <H4 style={{ paddingTop: "4px", marginLeft: "10px" }}>
              {member.name}({member.nickname})
            </H4>
          </ItemNameConatiner>
          <div style={{ display: "flex" }}>
            {props.needDropdown ? (
              <TeamDropDown
                category={
                  props.category !== undefined ? props.category : tempCategory
                }
                setCategory={
                  props.setCategory !== undefined
                    ? props.setCategory
                    : setTempCategory
                }
                MenuItems={props.menuItems}
                member={member}
                teamMembers={props.ResultList}
              ></TeamDropDown>
            ) : (
              <></>
            )}
            <TextButtonContainer
              style={{ color: props.textButtonColor }}
              onClick={props.handleButtonEvent}
            >
              {props.textButtonText}
            </TextButtonContainer>
          </div>
        </ResultItemContainer>
      ))}
    </ResultContainer>
  );
}
