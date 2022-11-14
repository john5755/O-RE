import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  TeamUserType,
  SearchMenues,
  ServerRoleMenues,
  TeamRoleMenues,
} from "../types";
import { useAppSelector } from "../hooks/reduxHook";

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues | ServerRoleMenues | TeamRoleMenues;
  member?: TeamUserType;
  teamMembers?: Array<TeamUserType>;
}

export default function TeamDropDown(props: SearchDropDownProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const categoryChange = (event: SelectChangeEvent, userId?: number) => {
    const cantChangeOwner: boolean =
      props.category === "OWNER" || event.target.value === "OWNER";
    const cantChangeSameRole: boolean = userProfile.role === props.category;
    if (cantChangeOwner || cantChangeSameRole) {
      alert("권한을 변경할 수 없습니다.");
      return;
    }
    props.setCategory(event.target.value as string);
    if (props.teamMembers !== undefined && userId !== undefined) {
      props.teamMembers[userId].role = event.target.value as string;
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 100, height: 38 }}>
        <Select
          id="demo-simple-select"
          value={
            props.member !== undefined ? props.member.role : props.category
          }
          onChange={(event) => {
            categoryChange(event, props.member?.userId);
          }}
        >
          {Object.entries(props.MenuItems).map((item, idx) => (
            <MenuItem value={item[0]} key={idx}>
              {item[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
