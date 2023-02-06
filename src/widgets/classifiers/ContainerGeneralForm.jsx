import React from "react";
import { Box } from "@mui/material";

const ContainerGeneralForm = ({ children, isEdit }) => {
  return (
    <Box
      component="div"
      sx={{
        padding: "1px 1px 5px 1px",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerGeneralForm;
