import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Box, Toolbar } from "@mui/material";

import ExternalSystemsPage from "pages/catalogs/ExternalSystemsPage";

import Header from "components/Header";

import { EXTERNAL_SYSTEMS } from "constants/routes";
import { LIGHT_THEME } from "constants/themes";

const routeComponents = {
  external_systems: ExternalSystemsPage,
};

const App = () => {
  const theme = useTheme();

  const bgColorMain =
    theme.palette.mode === LIGHT_THEME ? "#F5F5F5" : "#1D1F29";

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: bgColorMain,
        }}
      >
        <>
          <Header />
          <Box
            component="main"
            sx={{
              width: "100%",
              minHeight: "100vh",
              pt: "10px",
            }}
          >
            <Toolbar />
            <Switch>
              <Route
                key={EXTERNAL_SYSTEMS}
                path={`/${EXTERNAL_SYSTEMS}`}
                render={routeComponents[EXTERNAL_SYSTEMS]}
              />
              <Route
                path="/"
                render={() => <Redirect to={`/${EXTERNAL_SYSTEMS}`} />}
              />
            </Switch>
          </Box>
        </>
      </Box>
    </Router>
  );
};

export default App;
