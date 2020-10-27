import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const status = useSelector(state => state.users.status)
  
  // console.log(status, user)
  return (
    <Route
      {...rest}
      render={props => {
        if (!status)
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
