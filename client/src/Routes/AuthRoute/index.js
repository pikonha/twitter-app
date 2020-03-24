import React from "react";
import { Route, useHistory } from "react-router-dom";

export default function AuthRoute(props) {
  const history = useHistory();

  if (!localStorage.getItem("SESSION_TOKEN")) {
    history.push("/");
    return null;
  }

  return <Route {...props} />;
}
