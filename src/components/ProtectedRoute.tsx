import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../utils/Auth";

interface RouteProps {
  exact: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isUserAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
