import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TeamUserType, ServerRoleMenues, TeamRoleMenues } from "../types";

interface SearchMenues {
  name: string;
  nickName: string;
}

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues | ServerRoleMenues | TeamRoleMenues;
  member?: TeamUserType;
  teamMembers?: Array<TeamUserType>;
}

export default function TeamDropDown(props: SearchDropDownProps) {
  const categoryChange = (event: SelectChangeEvent, userId?: number) => {
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
