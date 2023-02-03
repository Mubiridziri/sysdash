import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import ExternalSystemsWidget from "widgets/externalSystems";

const ExternalSystemsPage = ({ match: { path } }) => {
  return (
    <Container maxWidth={false}>
      <Switch>
        <Route
          exact
          path={`${path}/create`}
          render={(props) => <ExternalSystemsWidget isCreate {...props} />}
        />
        <Route
          exact
          path={`${path}/:serviceId`}
          component={ExternalSystemsWidget}
        />
        <Route exact path={path} component={ExternalSystemsWidget} />
      </Switch>
    </Container>
  );
};

export default ExternalSystemsPage;
