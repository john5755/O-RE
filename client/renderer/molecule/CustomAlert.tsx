import { Alert, AlertColor, Dialog } from "@mui/material";
import React, { SetStateAction, Dispatch } from "react";

type AlertProps = {
  open: boolean;
  message: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  severity: AlertColor;
};

export default function CustomAlert({
  open,
  message,
  setOpen,
  severity,
}: AlertProps) {
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClick}>
        <Alert severity={severity}>{message}</Alert>
      </Dialog>
    </>
  );
}
