import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

import NavMenuItem from "./NavMenuItem";
import { ROUTES } from "constants/routes";

const NavMenu = ({ user }) => {
  const theme = useTheme();
  const history = useHistory();

  const tabGroupValue = JSON.parse(localStorage.getItem("tabGroupValue"));

  const [open, setOpen] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(tabGroupValue);

  const handleOpen = (id) => {
    setOpen(id);
  };

  const handleChange = (event, newValue, id) => {
    setTabValue({ [id]: newValue });
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      {ROUTES.map((item) => {
        return (
          <NavMenuItem
            key={item.id}
            {...item}
            mode={theme.palette.mode}
            user={user}
            history={history}
            tabValue={tabValue}
            handleChange={handleChange}
            open={open}
            handleOpen={handleOpen}
          />
        );
      })}
    </Box>
  );
};

export default NavMenu;
