import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(UserContext);
  if (isAuth) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
