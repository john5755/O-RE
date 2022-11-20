import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AlertColor,
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { PageRoleMenues } from "../types";
import { useAppSelector } from "../hooks/reduxHook";
import CustomAlert from "./CustomAlert";

interface PageDropDownProps {
  role: string;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: PageRoleMenues;
}

export default function PageDropDown(props: PageDropDownProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const currentPageRole = props.role;
  const originalRole = useMemo(() => {
    return props.category;
  }, []);
  const [category, setCategory] = useState(props.category);

  const categoryChange = (event: SelectChangeEvent) => {
    const cantChangeOwner: boolean =
      originalRole === "OWNER" || event.target.value === "OWNER";
    const cantChangeSameRole: boolean = currentPageRole === originalRole;
    const cantChangeMaintainer: boolean =
      originalRole === "MAINTAINER" && userProfile.role !== "OWNER";
    if (cantChangeOwner || cantChangeSameRole || cantChangeMaintainer) {
      setAlertMessage("권한을 변경할 수 없습니다.");
      setSeverity("warning");
      setAlertOpen(true);
      return;
    }
    props.setCategory(event.target.value as string);
    setCategory(event.target.value);
  };

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={severity}
      ></CustomAlert>
      <FormControl sx={{ width: 100, height: 38 }}>
        <Select
          id="demo-simple-select"
          value={category}
          onChange={(event) => {
            categoryChange(event);
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
