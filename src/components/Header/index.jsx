import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import NavMenu from "./NavMenu";
import SwitchMode from "components/SwitchMode";
import DateTime from "components/DateTime";

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
          <Box component="div" sx={{ fontSize: 18 }}>
            System Dashboard
          </Box>
          <NavMenu user={user} />
          <Box component="div" sx={{ display: "flex" }}>
            <SwitchMode />
            <Box component="div" sx={{ ml: "38px", mr: "25px" }}>
              <DateTime />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
