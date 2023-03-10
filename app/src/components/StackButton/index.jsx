import React from "react";
import { Stack } from "@mui/material";

const StackButton = ({ children, sx }) => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1}
      paddingTop={2}
      sx={{ ...sx }}
    >
      {children}
    </Stack>
  );
};

StackButton.defaultProps = {
  sx: {},
};

export default StackButton;
