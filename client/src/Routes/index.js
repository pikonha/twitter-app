import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute path="/home" component={Home} />
      </Switch>
    </Router>
  );
}
