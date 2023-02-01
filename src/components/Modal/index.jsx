import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal as MuiModal, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { closeModal } from "actions/modals";

export const MODAL_STATE = {
  IS_VIEW: "isView",
  IS_EDIT: "isEdit",
  OPENED: true,
  CLOSED: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const Modal = ({ modalName, title, children, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modals[modalName]);

  const handleClose = useCallback(() => {
    onClose();
    return dispatch(closeModal(modalName));
  }, [dispatch, modalName, onClose]);

  return (
    <MuiModal open={Boolean(open)} onClose={handleClose}>
      <Box sx={style}>
        <Box
          component="div"
          position="sticky"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box component="span" sx={{ fontSize: 18 }} color="primary">
            {title}
          </Box>
          <Box component="span">
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
        <Box component="div">
          <React.Fragment>{children}</React.Fragment>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
