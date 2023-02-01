import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import NavMenu from "./NavMenu";
import SwitchMode from "components/SwitchMode";
import DateTime from "components/DateTime";
import IconButton from "components/IconButton";

import "./styles.scss";

const Header = ({ user }) => {
  return (
    <AppBar
      sx={{
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            minHeight: {
              xs: 60,
            },
            justifyContent: "space-between",
          }}
          disableGutters
        >
          <div className="header__logo"></div>
          <NavMenu user={user} />
          <Box component="div" sx={{ display: "flex" }}>
            <SwitchMode />
            <Box component="div" sx={{ ml: "38px", mr: "25px" }}>
              <DateTime />
            </Box>
            <IconButton
              name="notify"
              title="Уведомления"
              size="small"
              color="inherit"
            />
            <IconButton
              name="user"
              title="Профиль"
              size="small"
              color="inherit"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
