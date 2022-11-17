import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { PageRoleMenues } from "../types";
import { useAppSelector } from "../hooks/reduxHook";

interface PageDropDownProps {
  role: string;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: PageRoleMenues;
  disabled: boolean;
}

export default function PageDropDown(props: PageDropDownProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const currentPageRole = props.role;
  const originalRole = useMemo(() => {
    return props.category;
  }, []);
  const [disabled, SetDisabled] = useState<boolean>(false);
  useEffect(() => {
    SetDisabled(props.disabled);
  }, [props.disabled]);

  const categoryChange = (event: SelectChangeEvent) => {
    const cantChangeOwner: boolean =
      originalRole === "OWNER" || event.target.value === "OWNER";
    const cantChangeSameRole: boolean = currentPageRole === originalRole;
    const cantChangeMaintainer: boolean =
      originalRole === "MAINTAINER" && userProfile.role !== "OWNER";
    if (cantChangeOwner || cantChangeSameRole || cantChangeMaintainer) {
      alert("권한을 변경할 수 없습니다.");
      return;
    }
    props.setCategory(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 100, height: 38 }}>
        <Select
          id="demo-simple-select"
          value={props.category}
          onChange={(event) => {
            categoryChange(event);
          }}
          disabled={disabled}
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
