import React from "react";
import { Switch, Route } from "react-router-dom";
import Purchase from "./components/Purchase";
import Dashboard from "./components/Dashboard";
import App from "./App";

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/purchase" component={Purchase} />
    <Route exact path="/dashboard" component={Dashboard} />

    <Route
      path="*"
      render={() => (
        <div>
          <p>Not Found</p>
        </div>
      )}
    />
  </Switch>
);
