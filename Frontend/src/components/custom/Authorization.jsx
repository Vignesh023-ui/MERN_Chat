import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "../../store/useAuthStore";

const Authorization = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  // * User can access Settings page without being logged in
  if (location.pathname === "/settings") {
    return <>{children}</>;
  }

  // * User can access other pages without being logged in (except /login and /signup)
  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/login" replace />;
  }

  // * User can't access Login or Signup page if already logged in
  if (
    isAuthenticated &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Authorization;
