import React from "react";
import { Box, CircularProgress } from "@mui/material";

const CircularLoading = ({ top, left, ...props }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        zIndex: 999,
      }}
    >
      <CircularProgress {...props} size={25} />
    </Box>
  );
};

CircularLoading.defaultProps = {
  top: 50,
  left: 50,
};

export default CircularLoading;
