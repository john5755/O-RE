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
import {
  PageRoleMenues
} from "../types"
import { useAppSelector } from "../hooks/reduxHook";

interface PageDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>
  MenuItems: PageRoleMenues
  disabled: boolean
}

export default function PageDropDown(props: PageDropDownProps){
  return <></>
}