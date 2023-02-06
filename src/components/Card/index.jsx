import React from "react";
import { Card as MuiCard, CardContent } from "@mui/material";
import { LIGHT_THEME } from "constants/themes";

const Card = ({ children, sxCard }) => {
  return (
    <MuiCard
      sx={{
        mb: 2,
        borderRadius: 3,
        bgcolor: (theme) =>
          theme.palette.mode === LIGHT_THEME
            ? "rgba(0, 78, 158, 0.08)"
            : "rgba(234, 151, 62, 0.16)",
        ...sxCard,
      }}
    >
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
