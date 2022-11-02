import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SearchMenues{
  name: string,
  nickName: string
}

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues
}

export default function GroupDropDown(props: SearchDropDownProps) {
  const categoryChange = (event: SelectChangeEvent)=>{
    props.setCategory(event.target.value as string)
  }


  return(
    <Box sx={{ minWidth: 120 }}>
    <FormControl sx={{ width: 100, height: 38 }}>
      <Select
        id="demo-simple-select"
        value={props.category}
        onChange={categoryChange}
        >
        {Object.entries(props.MenuItems).map((item, idx)=>(
            <MenuItem value={item[0]} key={idx}>{item[1]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>        
  )
}
