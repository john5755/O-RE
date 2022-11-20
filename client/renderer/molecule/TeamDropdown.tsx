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
import {
  TeamUserType,
  SearchMenues,
  ServerRoleMenues,
  TeamRoleMenues,
} from "../types";
import { useAppSelector } from "../hooks/reduxHook";
import CustomAlert from "./CustomAlert";

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues | ServerRoleMenues | TeamRoleMenues;
  member?: TeamUserType;
  teamMembers?: Array<TeamUserType>;
}

export default function TeamDropDown(props: SearchDropDownProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const currentTeamIdx = useAppSelector(
    (state) => state.myTeamsState.selectTeamState
  ).idx;
  const myTeam = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const currentTeamRole =
    currentTeamIdx === -1 ? undefined : myTeam[currentTeamIdx].teamUserRole;
  const originalRole = useMemo(() => {
    return props.category;
  }, []);
  const [category, setCategory] = useState(props.category);

  const categoryChange = (event: SelectChangeEvent) => {
    const cantChangeOwner: boolean =
      originalRole === "OWNER" || event.target.value === "OWNER";
    const cantChangeSameRole: boolean =
      currentTeamRole === undefined
        ? userProfile.role === originalRole
        : currentTeamRole === originalRole;
    const cantChangeLeader: boolean =
      originalRole === "LEADER" && userProfile.role !== "OWNER";
    if (cantChangeOwner || cantChangeSameRole || cantChangeLeader) {
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
