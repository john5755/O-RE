import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { H3, Button } from "../styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2.5,
};

const ImageContainer = styled.div`
  margin: 10px auto;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 10px auto;
`;

interface ModalProps {
  title?: string;
  content?: string | ReactNode;
  needImage: boolean;
  imgSrc?: string;
  needButton: boolean;
  open: boolean;
  setOpen: (params: boolean) => void;
  pathname?: string;
  setPage?: (params: string) => void;
}

export default function UserModal(props: ModalProps) {
  const handleClose = () => {
    if (props.needButton === false) {
      props.setOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <H3>{props.title}</H3>
          {props.needImage && (
            <ImageContainer>
              <img src={props.imgSrc} width="20%" height="20%"></img>
            </ImageContainer>
          )}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.content}
          </Typography>
          {props.needButton && (
            <ButtonContainer>
              <Button
                width="30%"
                height="45px"
                borderRadius="10%"
                onClick={() => {
                  props.setOpen(false);
                  if (
                    props.setPage !== undefined &&
                    props.pathname !== undefined
                  ) {
                    props.setPage(props.pathname);
                  }
                }}
              >
                확인
              </Button>
            </ButtonContainer>
          )}
        </Box>
      </Modal>
    </div>
  );
}
