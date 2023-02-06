import React from "react";
import { Box } from "@mui/material";

const ContainerGeneralForm = ({ children, isEdit }) => {
  return (
    <Box
      component="div"
      sx={{
        maxHeight: `calc(100vh - ${isEdit ? 234 : 172}px)`,
        overflow: "auto",
        padding: "1px 8px 5px 1px",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerGeneralForm;
