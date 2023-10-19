import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("token"); 

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
