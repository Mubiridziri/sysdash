import React from "react";
import { Box } from "@mui/material";

const CardTitle = ({ title }) => {
  return (
    <Box component="div" sx={{ mb: 1, fontWeight: 700 }}>
      {title}
    </Box>
  );
};

export default CardTitle;
