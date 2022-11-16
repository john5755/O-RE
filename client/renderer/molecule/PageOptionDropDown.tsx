import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "@emotion/styled";
import Router from "next/router";
import { useClickOther } from "../hooks/resetPageHook";
import { PAGE_ROLE, PAGE_USER_API, PATH } from "../constants";
import axios from "../utils/axios";
import { useAppDispatch } from "../hooks/reduxHook";
import { delPageState } from "../slices/pageSlice";

const ITEM_HEIGHT = 48;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type PageOptionDropDown = {
  role: string;
  pageId: number;
};

export default function PageOptionDropDown({
  role,
  pageId,
}: PageOptionDropDown) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const clickOther = useClickOther();

  const handlePageLeave = async (pageId: number) => {
    try {
      await axios.delete(`${PAGE_USER_API.LEAVE}/${pageId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      dispatch(delPageState(pageId));
    } catch (e: any) {
      alert(e?.response?.data?.message);
    }
  };

  return (
    <div>
      <IconContainer onClick={handleClick}>
        <SettingsIcon fontSize="small" style={{ fill: "#fff4f4" }} />
      </IconContainer>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {PAGE_ROLE.EDITOR.includes(role) && (
          <MenuItem
            onClick={() => {
              handleClose();
              Router.push(PATH.MANAGE_TEAM);
              clickOther();
            }}
            style={{ fontSize: "12px" }}
          >
            페이지 설정
          </MenuItem>
        )}
        <MenuItem
          style={{ color: "red", fontSize: "12px" }}
          onClick={() => {
            handleClose();
            handlePageLeave(pageId);
          }}
        >
          페이지 떠나기
        </MenuItem>
      </Menu>
    </div>
  );
}
