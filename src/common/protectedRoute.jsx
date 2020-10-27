import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const status = useSelector(state => state.users.status)
  const user = useSelector(state => state.users.user)
  return (
    <Route
      {...rest}
      render={props => {
        if (!status && !user)
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
