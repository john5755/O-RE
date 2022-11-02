import React, {Dispatch, SetStateAction, useState} from "react";
import styled from "@emotion/styled";
import { GroupUserType } from "../constants";
import { H4 } from "../styles";
import GroupDropDown from "./GroupDropdown";

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

const RoleAndButtonContainer = styled.div`
  display: flex;
`

const TextButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface SearchResultProps{
  ResultList: Array<GroupUserType>
  color: string
}

const RoleMenues = {
  "LEADER" : "리더",
  "MANAGER": "관리자",
  "USER": "사용자",
}

export default function SearchResults(props: SearchResultProps){
  const [tempCategory, setTempCategory] = useState("")

  return(<ResultContainer>
                  {props.ResultList.map((member, idx) => (
                <ResultItemContainer key={idx}>
                    <ItemNameConatiner>
                      <CurrentProfile src={member.profileImg}></CurrentProfile>
                      <H4 style={{ paddingTop: "4px", marginLeft: "10px" }}>
                        {member.name}({member.nickName})
                      </H4>
                    </ItemNameConatiner>
                      <TextButtonContainer style={{ color: props.color }}>
                      추가
                      </TextButtonContainer>
                </ResultItemContainer>
              ))}
  </ResultContainer>)
}