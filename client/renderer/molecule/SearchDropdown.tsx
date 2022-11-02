import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  onChange: (event: SelectChangeEvent) => {};
}

export default function SearchDropDown(props: SearchDropDownProps) {
  <Box sx={{ minWidth: 120 }}>
    <FormControl sx={{ width: 100, height: 38 }}>
      <Select
        id="demo-simple-select"
        value={props.category}
        onChange={props.onChange}
      >
        <MenuItem value="name">이름</MenuItem>
        <MenuItem value="nickName">닉네임</MenuItem>
      </Select>
    </FormControl>
  </Box>;
}
