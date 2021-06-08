import React, { FC } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);

export default App;
