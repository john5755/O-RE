import React, { SetStateAction, Dispatch, ChangeEventHandler } from "react";
import { Button } from "../styles";
import styled from "@emotion/styled";
import TeamDropDown from "./TeamDropdown";

const SearchTabContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const SearchBarContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  border-width: 0 0 1px 0;
  width: 85%;
  height: 90%;
  font-size: 20px;
  ::placeholder {
    text-align: center;
    font-size: 11px;
  }
  &:focus {
    outline: none;
  }
`;

interface SearchMenues {
  name: string;
  nickName: string;
}

interface searchBarProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues;
  handleSearchInput: ChangeEventHandler<HTMLInputElement>;
  fetchResultList: () => void;
}

const searchMenues = { name: "이름", nickName: "닉네임" };

export default function SearchBarTab(props: searchBarProps) {
  return (
    <SearchTabContainer>
      <SearchBarContainer>
        <TeamDropDown
          category={props.category}
          setCategory={props.setCategory}
          MenuItems={searchMenues}
        ></TeamDropDown>
        <SearchInput onChange={props.handleSearchInput}></SearchInput>
      </SearchBarContainer>
      <Button
        width="60px"
        height="40px"
        borderRadius="10px"
        onClick={() => {
          props.fetchResultList();
        }}
      >
        검색
      </Button>
    </SearchTabContainer>
  );
}
