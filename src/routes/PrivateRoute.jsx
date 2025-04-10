import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to={"/login"} />}
    />
  );
};

export default PrivateRoute;
