import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Box, Toolbar } from "@mui/material";

import HelpPage from "pages/HelpPage";
import DriversPage from "pages/catalogs/DriversPage";

import Header from "components/Header";

import { ROUTES } from "constants/routes";
import { LIGHT_THEME } from "constants/themes";

const routeComponents = {
  drivers: DriversPage,
};

const App = () => {
  const theme = useTheme();

  const bgColorMain =
    theme.palette.mode === LIGHT_THEME ? "#F5F5F5" : "#1D1F29";

  const filterRoutes = ROUTES.filter((route) => {
    return !!route.childRoutes.length;
  });

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
              {filterRoutes.map((item) => (
                <Route
                  exact
                  key={item.id}
                  path={item.path}
                  component={HelpPage}
                />
              ))}
              {ROUTES.map((item) =>
                item.childRoutes.map((route) => (
                  <Route
                    key={route.id}
                    path={`${item.path}/${route.id}`}
                    render={routeComponents[route.id]}
                  />
                ))
              )}
              <Route path="/" render={() => <Redirect to="/catalogs" />} />
            </Switch>
          </Box>
        </>
      </Box>
    </Router>
  );
};

export default App;
