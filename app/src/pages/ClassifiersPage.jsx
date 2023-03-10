import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import ClassifiersWidget from "widgets/classifiers";

const ClassifiersPage = ({ match: { path } }) => {
  return (
    <Container maxWidth={false}>
      <Switch>
        <Route
          exact
          path={`${path}/create`}
          render={(props) => <ClassifiersWidget isCreate {...props} />}
        />
        <Route
          exact
          path={`${path}/:classifierId/:tabKey`}
          component={ClassifiersWidget}
        />
        <Route exact path={path} component={ClassifiersWidget} />
        <Route
          path={`${path}/:classifierId`}
          render={() => <Redirect to={path} />}
        />
      </Switch>
    </Container>
  );
};

export default ClassifiersPage;
